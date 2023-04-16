import { useEffect, useState, useCallback } from 'react';
import type { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Button } from '@mui/material';
import type { Event } from "./types";
import query from "tools/query";
import GoalCard from 'components/goalCard/GoalCard';

function GoalsList() {
    const navigate = useNavigate();
    const [goals, setGoals] = useState([])
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');

    const getGoals = useCallback(async () => {
        try {
            const response = await query(`goals/${userId}`, "get");
            const data = await response.json();
            setGoals(data);
            setLoading(false)
        }
        catch (error) {
            setError(error.message)
        }
      }, [userId]);

    useEffect(() => {
        getGoals();
    }, [getGoals])

    async function onCompleteGoalChange(event: Event, id: string) {
        const newValue = event.target.value === 'true';
        try {
            await query(`goals/${id}/updateStatus`, "patch", { completed: !newValue, lastEdited: Date.now() });
            getGoals()
        }
        catch (error) {
            setError(error.message)
        }
    }
    async function onDeleteClick(event: MouseEvent<HTMLElement>, id: string) {
        event.stopPropagation();
        try {
            await query(`goals/${id}/delete`, "delete");
            getGoals()
        } catch (error) {
            setError(error.message)
        }
    }

    function onCardClick(event: MouseEvent<HTMLElement>, goalId) {
        event.stopPropagation();
        navigate(`/goal/${goalId}`)
    }

    function onUpdateClick(event: MouseEvent<HTMLElement>, goalId) {
        event.stopPropagation();
        navigate(`/goal/${goalId}`);
    }

    if (loading) {
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
            <Grid container item sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" color='primary' onClick={() => navigate('/goal')}>Create new Goal</Button>
            </Grid>

            <Grid container item direction={'row'} sx={{ justifyContent: 'left' }}>
                {goals.length ? goals.map((goal) => (
                    <GoalCard
                        key={goal._id}
                        goal={goal}
                        onCardClick={onCardClick}
                        onCompleteGoalChange={onCompleteGoalChange}
                        onUpdateClick={onUpdateClick}
                        onDeleteClick={onDeleteClick} />
                )) :
                    <Typography>You don't have goals in your life. This is sad</Typography>
                }
            </Grid>
        </Grid>
    )
}

export default GoalsList;