import { Checkbox, CardContent, Card, Typography, CardActions, Button } from '@mui/material';

function GoalCard(props) {
    const { goal, onCardClick, onCompleteGoalChange, onUpdateClick, onDeleteClick } = props

    return (
        <Card key={goal._id} sx={{ width: 250, background: '#FDFDA4', margin: '16px', cursor: "pointer" }} raised onClick={event => onCardClick(event, goal._id)}>
            <CardContent>
                <Typography variant='h5' component='div'>
                    {goal.name}
                    <Checkbox
                        checked={goal.completed}
                        value={goal.completed}
                        onClick={event => event.stopPropagation()}
                        onChange={event => onCompleteGoalChange(event, goal._id)} />

                </Typography>
                <Typography variant='body2'>
                    {goal.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small' onClick={event => onUpdateClick(event, goal._id)}>Update</Button>
                <Button size='small' onClick={event => onDeleteClick(event, goal._id)}>Delete</Button>
            </CardActions>
        </Card>
    )
}

export default GoalCard;