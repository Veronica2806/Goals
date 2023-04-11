import { Checkbox, CardContent, Card, Typography } from '@mui/material';

function StepCard(props) {
    const { step, onCompleteStepChange } = props;
    
    return (
        <Card
            key={step._id}
            sx={{
                width: 250,
                background: step.goalColor,
                marginRight: '16px'
            }}
            raised>
            <CardContent>
                <Typography
                    sx={{ fontSize: 14 }}
                    color='text.secondary'
                    gutterBottom>
                    {step.goalName}
                </Typography>
                <Typography variant='h5' component='div'>
                    {step.name}
                    <Checkbox
                        checked={step.completed}
                        value={step.completed}
                        onChange={(event) => onCompleteStepChange(step._id, step.goalId, event)} />
                </Typography>
                <Typography variant='body2'>
                    {step.description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default StepCard;