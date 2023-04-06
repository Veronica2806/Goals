import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import type { Event } from "./types";
import query from "tools/query";

function Home() {
    const navigate = useNavigate();
    const [steps, setSteps] = useState([])
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNextSteps()
    }, []);

    async function getNextSteps() {
        try {
            const response = await query("goals/nextSteps", "get");
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
            await query(`steps/${goalId}/updateStepStatus/${id}`, 'patch', { completed: !newValue })
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
            <Grid item><Typography variant='h4'>Next steps to achieve your goals</Typography> </Grid>
            <Grid container item direction={'row'} sx={{ justifyContent: 'center' }}>
                {steps.map((step) => {
                    return (<Card
                        key={step._id}
                        sx={{
                            width: 250,
                            background: '#FDFDA4',
                            marginRight: '16px'
                        }}
                        raised>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color='text.secondary'
                                gutterBottom>
                                {step.goalName}
                            </Typography>
                            <Typography variant='h5' component='div'>
                                {step.name}
                                <Checkbox
                                    checked={step.completed}
                                    value={step.completed}
                                    onChange={(event) => onCompleteStepChange(step._id, step.goalId, event)} />
                            </Typography>
                            <Typography variant='body2'>
                                {step.description}
                            </Typography>
                        </CardContent>
                    </Card>)
                }
                )}
            </Grid>
        </Grid>
    )
}

export default Home;