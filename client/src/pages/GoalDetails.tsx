import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate, useParams } from 'react-router-dom';
import type { Event, Goal } from "./types";

function GoalDetails() {
    const navigate = useNavigate();
    const { goalId } = useParams();
    const [goal, setGoal] = useState<Goal>();
    const [error, setError] = useState();
    useEffect(() => {
        fetch(`http://localhost:4000/goals/${goalId}`)
            .then((res) => res.json())
            .then((data) => setGoal(data))
            .catch(error => setError(error))
    }, [goalId])

    async function onCompleteStepChange(id: string, event: Event) {
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
            fetch(`http://localhost:4000/goals/${goalId}`)
                .then((res) => res.json())
                .then((data) => setGoal(data))
                .catch(error => setError(error))
        }
        catch (err) {
            setError(error)
        }
    }

    async function onCompleteGoalChange(id: string, event: Event) {
        const newValue = event.target.value === 'true';
        try {
            await fetch(`http://localhost:4000/goals/${id}/updateStatus`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({ completed: !newValue }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            fetch(`http://localhost:4000/goals/${goalId}`)
                .then((res) => res.json())
                .then((data) => setGoal(data))
                .catch(error => setError(error))
        }
        catch (err) {
            setError(error)
        }
    }

    async function onDelete(id: string) {
        try {
            await fetch(`http://localhost:4000/goals/${id}/delete`,
                {
                    method: 'DELETE'
                })
            navigate('/goalslist')
        } catch (err) {
            setError(error)
        }
    }
    if (!goal) {
        return (
            <Grid container sx={{ justifyContent: 'center' }} spacing={6}>
                <Typography>Loading ...</Typography>
            </Grid>
        )
    }
    if (error) {
        return <Typography>{error}</Typography>
    }

    else return (
        <Grid container sx={{ justifyContent: 'center' }} spacing={6}>
            <Grid item>
                <Typography variant='h3'>Your goals</Typography>
            </Grid>
            <Grid container item sx={{ justifyContent: 'center' }}>
                <Button variant='outlined' sx={{ marginRight: '16px' }} onClick={() => navigate('/')}>go home</Button>
                <Button variant='outlined' onClick={() => navigate('/goalslist')}>See full list of goals</Button>
            </Grid>
            <Grid container item direction={'row'} justifyContent='center'>
                <Card sx={{ width: 700, background: '#FDFDA4', margin: '16px' }} raised>
                    <CardContent>
                        <Typography variant='h4' component='div'>
                            {goal.name}
                            <Checkbox
                                checked={goal.completed}
                                value={goal.completed}
                                onChange={(event) => onCompleteGoalChange(goal._id, event)} />
                        </Typography>
                        <Typography variant='h6'>
                            {goal.description}
                        </Typography>
                        <Typography variant='body1'>
                            Steps:
                        </Typography>

                        {goal.steps.map(step => (
                            <Grid item container key={step._id} alignItems='center'>
                                <Typography variant='body1'>{step.name}</Typography>:
                                <Typography variant='body1'>{step.description}</Typography>
                                <Checkbox
                                    checked={step.completed}
                                    value={step.completed}
                                    onChange={(event) => onCompleteStepChange(step._id, event)} />
                            </Grid>
                        ))}

                    </CardContent>
                    <CardActions>
                        <Button size='small' onClick={() => navigate(`/goal/${goal._id}`)}>Update</Button>
                        <Button size='small' onClick={() => onDelete(goal._id)}>Delete</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default GoalDetails;