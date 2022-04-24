import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import type { Event } from "./types";

function Home() {
    const navigate = useNavigate();
    const [steps, setSteps] = useState([])
    const [error, setError] = useState();
    useEffect(() => {
        fetch('http://localhost:4000/goals/nextSteps')
            .then((res) => res.json())
            .then((data) => setSteps(data))
            .catch(error => setError(error))
    }, []);

    async function onCompleteStepChange(id: string, goalId: string, event: Event) {
        const newValue = event.target.value === 'true';
        try {
            await fetch(`http://localhost:4000/steps/${goalId}/updateStepStatus/${id}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({ completed: !newValue }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            fetch('http://localhost:4000/goals/nextSteps')
                .then((res) => res.json())
                .then((data) => setSteps(data))
                .catch(error => setError(error))
        }
        catch (err) {
            setError(error)
        }
    }
    if (!steps.length) {
        return (
            <Grid container sx={{ justifyContent: 'center' }} spacing={6}>
                <Typography>Loading ...</Typography>
            </Grid>
        )
    }
    if (error) {
        return <Typography>{error}</Typography>
    }
    return (
        <Grid container sx={{ justifyContent: 'center' }} spacing={6}>
            <Grid item><Typography variant='h3'>the Goal Achiever</Typography> </Grid>
            <Grid container item sx={{ justifyContent: 'center' }}>
                <Button variant='outlined' sx={{ marginRight: '16px' }} onClick={() => navigate('/goalslist')}>See full list of goals</Button>
                <Button variant='outlined' onClick={() => navigate('/goal')}>Create new Goal</Button>
            </Grid>
            <Grid item><Typography variant='h4'>Next steps to achieve your goals</Typography> </Grid>
            <Grid container item direction={'row'} sx={{ justifyContent: 'center' }}>
                {steps.map((step) => (
                    <Card key={step.step._id} sx={{ width: 250, background: '#FDFDA4', marginRight: '16px' }} raised>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                                {step.goalName}
                            </Typography>
                            <Typography variant='h5' component='div'>
                                {step.step.name}
                                <Checkbox checked={step.step.completed} value={step.step.completed} onChange={(event) => onCompleteStepChange(step.step._id, step.goalId, event)} />
                            </Typography>
                            <Typography variant='body2'>
                                {step.step.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        </Grid>
    )
}

export default Home;