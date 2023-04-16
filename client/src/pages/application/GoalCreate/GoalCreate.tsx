import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Button } from '@mui/material';
import type { Goal } from '../types';
import query from 'tools/query';
import GoalForm from 'components/goalForm/GoalForm';

function GoalCreate() {
    const navigate = useNavigate();
    const [error, setError] = useState();
    const userId = localStorage.getItem('userId');

    async function onSubmit(values: Goal) {
        const requestLink = 'goals/create';
        const requestMethod = 'POST';
        const body = {
            ...values,
            userId,
            steps: values.steps || [],
            lastEdited: Date.now(),
            createdDate: Date.now(),
        }
        try {
            const response = await query(requestLink, requestMethod, body);
            const jsonResponse = await response.json()
            navigate(`/goal/${jsonResponse._id}`)
        } catch (error) {
            setError(error.message);
        }
    }
    if (error) {
        return <Typography>{error}</Typography>
    }

    else return (
        <Grid container sx={{ justifyContent: 'center' }} spacing={6}>
            <Grid container item sx={{ justifyContent: 'right' }}>
                <Button variant="contained" color='primary' onClick={() => navigate('/goalslist')}>go home</Button>
            </Grid>

            <GoalForm onSubmit={onSubmit} />
        </Grid >
    )
}

export default GoalCreate;