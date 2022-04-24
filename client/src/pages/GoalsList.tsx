import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import type { Event } from "./types";

function GoalsList() {
    const navigate = useNavigate();
    const [goals, setGoals] = useState([])
    const [error, setError] = useState();
    useEffect(() => {
        fetch('http://localhost:4000/goals')
            .then((res) => res.json())
            .then((data) => setGoals(data))
            .catch(error => setError(error))
    }, [])
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
            fetch(`http://localhost:4000/goals`)
                .then((res) => res.json())
                .then((data) => setGoals(data))
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
            fetch(`http://localhost:4000/goals`)
                .then((res) => res.json())
                .then((data) => setGoals(data))
                .catch(error => setError(error))
        } catch (err) {
            setError(error)
        }
    }

    if (!goals.length) {
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
                <Button variant='outlined' onClick={() => navigate('/goal')}>Create new Goal</Button>
            </Grid>

            <Grid container item direction={'row'} sx={{ justifyContent: 'center' }}>
                {goals.map((goal) => (
                    <Card key={goal._id} sx={{ width: 250, background: '#FDFDA4', margin: '16px' }} raised>
                        <CardContent>
                            <Typography variant='h5' component='div'>
                                {goal.name}
                                <Checkbox
                                    checked={goal.completed}
                                    value={goal.completed}
                                    onChange={(event) => onCompleteGoalChange(goal._id, event)} />

                            </Typography>
                            <Typography variant='body2'>
                                {goal.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size='small' onClick={() => navigate(`/goalslist/${goal._id}`)}>See more</Button>
                            <Button size='small' onClick={() => navigate(`/goal/${goal._id}`)}>Update</Button>
                            <Button size='small' onClick={() => onDelete(goal._id)}>Delete</Button>
                        </CardActions>
                    </Card>
                ))}
            </Grid>
        </Grid>
    )
}

export default GoalsList;