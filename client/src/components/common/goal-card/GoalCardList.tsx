import { Checkbox, CardContent, Card, Typography, Button, Grid } from '@mui/material';

export function GoalCardList(props) {
    const { goal, onCardClick, onCompleteGoalChange, onDeleteClick } = props;

    return (
        <Card
            sx={{ width: 800, background: goal.goalColor, margin: '8px 16px', cursor: 'pointer' }}
            variant="outlined"
            onClick={event => onCardClick(event, goal._id)}>
            <CardContent sx={{ paddingTop: '8px' }}>
                <Grid container alignItems='center' justifyContent='flex-start'>
                    <Checkbox
                        sx={{ width: 20 }}
                        checked={goal.completed}
                        value={goal.completed}
                        onClick={event => event.stopPropagation()}
                        onChange={event => onCompleteGoalChange(event, goal._id)} />
                    <Typography variant='h6' noWrap={true} width='85%' sx={{ fontWeight: 400 }} ml={2}>
                        {goal.name}
                    </Typography>
                    <Button size='small' onClick={event => onDeleteClick(event, goal._id)}>Delete</Button>
                </Grid>
                {goal.description && <Typography variant='body2' noWrap={true}>
                    {goal.description}
                </Typography>}
            </CardContent>
        </Card>
    )
}