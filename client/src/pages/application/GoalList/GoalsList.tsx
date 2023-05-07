import { useEffect, useState, useCallback } from 'react';
import type { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNextSteps } from 'store/nextSteps/nextSteps';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Grid, Button } from '@mui/material';
import type { Event } from "../types";
import query from "tools/query";
import { GoalCardGrid, GoalCardList, ViewSelect } from 'components/common';
import { fetchUserInfo } from 'store/userInfo/userInfoGet';

function GoalsList() {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    const { folderId } = useParams<string>();
    const { userInfo }: any = useSelector(state => state);
    const userView = userInfo.data?.meta?.goalListView || "grid";
    const isGrid = userView === "grid";
    const GoalComponent = isGrid ? GoalCardGrid : GoalCardList;

    const getGoals = useCallback(async () => {
        try {
            const path = folderId ? `goals/${userId}/${folderId}` : `goals/${userId}`
            const response = await query(path, "get");
            const data = await response.json();
            setGoals(data);
            setLoading(false)
        }
        catch (error) {
            setError(error.message)
        }
    }, [userId, folderId]);

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
            const deletedGoal = goals.find(goal => goal._id === id);
            if (deletedGoal.steps.length) {
                dispatch(fetchNextSteps(userId))
            }
            getGoals()
        } catch (error) {
            setError(error.message)
        }
    }

    function onCardClick(event: MouseEvent<HTMLElement>, goalId) {
        event.stopPropagation();
        navigate(`/goal/${goalId}`)
    }

    async function onChangeViewClick(value) {
        await query(`user/${userId}`, "patch", { goalListView: value });
        dispatch(fetchUserInfo(userId));
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
            <Grid container item sx={{ justifyContent: 'space-between' }}>
                <ViewSelect value={userView} onChange={onChangeViewClick} />
                <Button variant="contained" color='primary' onClick={() => navigate('/goal')}>Create new Goal</Button>
            </Grid>

            <Grid direction={isGrid ? 'row' : 'column'} container item sx={{ justifyContent: 'left' }} >
                {goals.length ? goals.map((goal) => (
                    <GoalComponent
                        key={goal._id}
                        goal={goal}
                        onCardClick={onCardClick}
                        onCompleteGoalChange={onCompleteGoalChange}
                        onDeleteClick={onDeleteClick} />
                )) :
                    <Typography>You don't have goals in your life. This is sad</Typography>
                }
            </Grid>
        </Grid>
    )
}

export default GoalsList;