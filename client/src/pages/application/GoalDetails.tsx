import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Checkbox, CardContent, CardActions, Card, Typography, Grid, Button } from '@mui/material';
import type { Event, Goal } from './types';
import query from 'tools/query';
import convertDate from 'tools/convertDate';

function GoalDetails() {
    const navigate = useNavigate();
    const { goalId } = useParams<string>();
    const [goal, setGoal] = useState<Goal>();
    const [error, setError] = useState();
    const localeCreatedDate = convertDate(goal?.createdDate);
    const localelastEditedDate = convertDate(goal?.lastEdited);

    async function getGoal(goalId: string) {
        try {
            const response = await query(`goals/details/${goalId}`, 'GET');
            const data = await response.json();
            setGoal(data);
        } catch (error) {
            setError(error.message)
        }
    }
    useEffect(() => {
        getGoal(goalId);
    }, [goalId])

    async function onCompleteStepChange(id: string, event: Event) {
        const newValue = event.target.value === 'true';
        try {
            const response = await query(`steps/${goalId}/updateStepStatus/${id}`, 'PATCH', { completed: !newValue, lastEdited: Date.now() });
            const data = await response.json();
            getGoal(data._id);
        }
        catch (error) {
            setError(error.message)
        }
    }

    async function onCompleteGoalChange(id: string, event: Event) {
        const newValue = event.target.value === 'true';
        try {
            const response = await query(`goals/${id}/updateStatus`, 'PATCH', { completed: !newValue, lastEdited: Date.now() });
            const data = await response.json();
            getGoal(data._id);
        }
        catch (error) {
            setError(error.message)
        }
    }

    async function onDelete(id: string) {
        try {
            await query(`goals/${id}/delete`, 'DELETE');
            navigate('/goalslist')
        } catch (err) {
            setError(error)
        }
    }
    if (!goal) {
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
            <Grid container item sx={{ justifyContent: 'right' }}>
                <Button variant="contained" color='primary' onClick={() => navigate('/goalslist')}>go home</Button>
            </Grid>
            <Grid container item direction={'row'} justifyContent='center'>
                <Card sx={{ width: 700, minHeight: 500 , background: goal.goalColor, margin: '16px', display: 'flex', flexDirection: 'column' }}  variant="outlined">
                    <CardContent>
                        <Grid container item justifyContent='space-between'>
                        <Typography variant='h4' component='div'>
                            {goal.name}
                            <Checkbox
                                checked={goal.completed}
                                value={goal.completed}
                                onChange={(event) => onCompleteGoalChange(goal._id, event)} />
                        </Typography>
                        <CardActions>
                            <Button size='small' onClick={() => navigate(`/goal/${goal._id}`)}>Update</Button>
                            <Button size='small' onClick={() => onDelete(goal._id)}>Delete</Button>
                        </CardActions>
                        </Grid>
                        <Typography variant='h6'>
                            {goal.description}
                        </Typography>
                        <Typography variant='body1'>
                            Steps:
                        </Typography>

                        {goal.steps?.map(step => (
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
                    <Grid item container alignItems='center' justifyContent='flex-end' alignSelf='end'>
                        <Grid sx={{ color: 'gray' }} pr={1}>
                            <Typography variant='body2'>{`Last Edited: ${localelastEditedDate}`}</Typography>
                            <Typography variant='body2'>{`Created: ${localeCreatedDate}`}</Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

export default GoalDetails;