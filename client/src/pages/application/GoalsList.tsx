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
import query from "tools/query";

function GoalsList() {
    const navigate = useNavigate();
    const [goals, setGoals] = useState([])
    const [error, setError] = useState();

    useEffect(() => {
        getGoals();
    }, [])

    async function getGoals() {
        try {
            const response = await query("goals", "get");
            const data = await response.json();
            setGoals(data);
        }
        catch (error) {
            setError(error.message)
        }
    }

    async function onCompleteGoalChange(id: string, event: Event) {
        const newValue = event.target.value === 'true';
        try {
            await query(`goals/${id}/updateStatus`, "patch", { completed: !newValue });
            getGoals()
        }
        catch (error) {
            setError(error.message)
        }
    }
    async function onDelete(id: string) {
        try {
            await query(`goals/${id}/delete`, "delete");
            getGoals()
        } catch (error) {
            setError(error.message)
        }
    }

    if (!goals.length) {
        return (
            <Grid container sx={{ justifyContent: 'center' }}>
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
                <Button variant='outlined' sx={{ marginRight: '16px' }} onClick={() => navigate('/home')}>go home</Button>
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