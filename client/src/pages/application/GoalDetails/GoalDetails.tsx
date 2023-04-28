import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoldersList } from 'store/foldersList/foldersList';
import { fetchNextSteps } from 'store/nextSteps/nextSteps';
import { Typography, Grid, Button } from '@mui/material';
import type { Event, Goal } from '../types';
import query from 'tools/query';
import { GoalForm } from 'components';


function GoalDetails() {
    const navigate = useNavigate();
    const { goalId } = useParams<string>();
    const [goal, setGoal] = useState<Goal>();
    const dispatch = useDispatch<any>();
    const [error, setError] = useState();
    const userId = localStorage.getItem('userId');
    const { foldersList }: any = useSelector(state => state)

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
        if (!foldersList.data) {
            dispatch(fetchFoldersList(userId));
        }
    }, [goalId])

    async function onCompleteStepChange(id: string, event: Event) {
        const newValue = event.target.value === 'true';
        try {
            const response = await query(`steps/${goalId}/updateStepStatus/${id}`, 'PATCH', { completed: !newValue, lastEdited: Date.now() });
            const data = await response.json();
            getGoal(data._id);
            dispatch(fetchNextSteps(userId));
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

    async function onDeleteClick(id: string) {
        try {
            await query(`goals/${id}/delete`, 'DELETE');
            if (goal.steps.length) {
                dispatch(fetchNextSteps(userId));
            }
            navigate('/goalslist');
        } catch (err) {
            setError(error)
        }
    }

    async function onFolderClick(folderId) {
        await query(`goals/${goalId}/updateFolder`, 'patch', { folderId });
    }

    async function onSubmit(values: Goal) {
        const requestLink = `goals/${goalId}/update`;
        const requestMethod = 'PUT';
        const body = {
            ...values,
            userId,
            steps: values.steps || [],
            lastEdited: Date.now(),
            createdDate: goal.createdDate
        }
        try {
            await query(requestLink, requestMethod, body);
            getGoal(goalId);
        } catch (error) {
            setError(error.message);
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

            <GoalForm
                onSubmit={onSubmit}
                goal={goal}
                onDeleteClick={onDeleteClick}
                onCompleteGoalChange={onCompleteGoalChange}
                onCompleteStepChange={onCompleteStepChange}
                goalId={goalId}
                onFolderClick={onFolderClick} />
        </Grid >
    )
}

export default GoalDetails;