import { Checkbox, CardContent, Card, Typography, CardActions, Button, Grid } from '@mui/material';

export function GoalCardGrid(props) {
    const { goal, onCardClick, onCompleteGoalChange, onDeleteClick } = props;

    return (
        <Card
            sx={{ width: 250, background: goal.goalColor, margin: '16px', cursor: 'pointer' }}
            variant="outlined"
            onClick={event => onCardClick(event, goal._id)}>
            <CardContent>
                <Grid container alignItems='center' justifyContent='space-between'>
                    <Typography variant='h5' noWrap={true} width='80%' sx={{ fontWeight: 400 }}>
                        {goal.name}
                    </Typography>
                    <Checkbox
                        checked={goal.completed}
                        value={goal.completed}
                        onClick={event => event.stopPropagation()}
                        onChange={event => onCompleteGoalChange(event, goal._id)}
                    />
                </Grid>
                {goal.description && <Typography variant='body2' noWrap={true}>
                    {goal.description}
                </Typography>
                }
            </CardContent>
            <CardActions >
                <Button size='small' onClick={event => onDeleteClick(event, goal._id)}>Delete</Button>
            </CardActions>
        </Card>
    )
}