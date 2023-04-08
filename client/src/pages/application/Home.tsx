import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Button, Alert} from '@mui/material';
import type { Event } from "./types";
import query from "tools/query";
import StepCard from 'components/stepCard/StepCard';

function Home() {
    const navigate = useNavigate();
    const [steps, setSteps] = useState([])
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        getNextSteps()
    }, []);

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

    async function onCompleteStepChange(id: string, goalId: string, event: Event) {
        const newValue = event.target.value === 'true';
        try {
            await query(`steps/${goalId}/updateStepStatus/${id}`, 'patch', { completed: !newValue,  lastEdited: Date.now() })
            getNextSteps();
        }
        catch (error) {
            setError(error.message);
        }
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
            <Grid container item sx={{ justifyContent: 'center' }}>
                <Button variant='outlined' sx={{ marginRight: '16px' }} onClick={() => navigate('/goalslist')}>See full list of goals</Button>
                <Button variant='outlined' onClick={() => navigate('/goal')}>Create new Goal</Button>
            </Grid>
            {steps.length ?
                <>
                    <Grid item><Typography variant='h4'>Next steps to achieve your goals</Typography> </Grid>
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

export default Home;