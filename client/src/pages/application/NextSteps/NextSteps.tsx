import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNextSteps } from 'store/nextSteps/nextSteps';
import { Typography, Grid, Alert } from '@mui/material';
import type { Event } from "../types";
import query from "tools/query";
import { StepCard } from 'components/common';

function NextSteps() {
    const [error, setError] = useState();
    const dispatch = useDispatch<any>();
    const userId = localStorage.getItem('userId');
    const isAuthenticated = localStorage.getItem('AccessToken');
    const { nextSteps }: any = useSelector(state => state);

    useEffect(() => {
        if (isAuthenticated && !nextSteps.data) {
            dispatch(fetchNextSteps(userId));
        }
    }, [isAuthenticated])

    async function onCompleteStepChange(event: Event, id: string, goalId: string) {
        const newValue = event.target.value === 'true';
        try {
            await query(`steps/${goalId}/updateStepStatus/${id}`, 'patch', { completed: !newValue, lastEdited: Date.now() })
            dispatch(fetchNextSteps(userId));
        }
        catch (error) {
            setError(error.message);
        }
    }
    if (!isAuthenticated) {
        return (
            <Grid container item justifyContent='center' >
                <Typography variant='body1'>Please login to see your next steps</Typography>
            </Grid>
        )
    }

    if (nextSteps.loading && !nextSteps.data) {
        return (
            <Grid container item justifyContent='center' >
                <Typography>Loading ...</Typography>
            </Grid>
        )
    }
    if (error && nextSteps.error) {
        return <Alert
            variant="outlined"
            severity="error">{error}</Alert>
    }
    return (
        <Grid container item sx={{ justifyContent: 'center' }} spacing={6}>
            {nextSteps.data?.length ?
                <>
                    <Grid item><Typography variant='h6'>Next steps to achieve your goals</Typography> </Grid>
                    <Grid container item direction={'row'} sx={{ justifyContent: 'center' }}>
                        {nextSteps.data.map((step) => <StepCard
                            key={step._id}
                            step={step}
                            onCompleteStepChange={onCompleteStepChange} />)}
                    </Grid>
                </>
                :
                <Grid item>
                    <Typography variant='h4'>You don't have steps</Typography>
                    <Typography variant='body1'>We recommend breaking goals down into steps</Typography>
                </Grid>
            }
        </Grid>
    )
}

export default NextSteps;