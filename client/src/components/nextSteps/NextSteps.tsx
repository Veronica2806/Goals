import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Grid, Alert } from '@mui/material';
import type { Event } from "../../pages/application/types";
import query from "tools/query";
import StepCard from 'components/stepCard/StepCard';

function NextSteps() {
    let location = useLocation();
    const [steps, setSteps] = useState([])
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const isAuthenticated = localStorage.getItem('AccessToken')

    useEffect(() => {
        if (isAuthenticated) {
            getNextSteps()
        }
    }, [location, isAuthenticated]);

    async function getNextSteps() {
        try {
            const response = await query(`goals/nextSteps/${userId}`, "get");
            const data = await response.json();
            setLoading(false)
            setSteps(data)
        }
        catch (error) {
            setError(error.message);
        }
    }

    async function onCompleteStepChange( event: Event, id: string, goalId: string) {
        const newValue = event.target.value === 'true';
        try {
            await query(`steps/${goalId}/updateStepStatus/${id}`, 'patch', { completed: !newValue, lastEdited: Date.now() })
            getNextSteps();
        }
        catch (error) {
            setError(error.message);
        }
    }
    if(!isAuthenticated){
        return (
            <Grid container item justifyContent='center' >
                <Typography variant='body1'>Please login to see your next steps</Typography>
            </Grid>
        )
    }

    if (loading) {
        return (
            <Grid container item justifyContent='center' >
                <Typography>Loading ...</Typography>
            </Grid>
        )
    }
    if (error) {
        return <Alert
            variant="outlined"
            severity="error">{error}</Alert>
    }
    return (
        <Grid container item sx={{ justifyContent: 'center' }} spacing={6}>
            {steps.length ?
                <>
                    <Grid item><Typography variant='h6'>Next steps to achieve your goals</Typography> </Grid>
                    <Grid container item direction={'row'} sx={{ justifyContent: 'center' }}>
                        {steps.map((step) => <StepCard
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