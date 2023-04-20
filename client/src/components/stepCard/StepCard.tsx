import { Checkbox, Grid, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function StepCard(props) {
    const { step, onCompleteStepChange } = props;
    const navigate = useNavigate();

    function onStepClick() {
        navigate(`/goal/${step.goalId}`)
    }
    return (
        <Card
            sx={{
                width: 250,
                background: step.goalColor,
                marginBottom: '16px',
                cursor: 'pointer'
            }}
            onClick={onStepClick}
            variant="outlined"
        >
            <Grid container p={1} justifyContent='space-between' alignItems='center'>
                <Typography variant='body1' component='div'>
                    {step.name}
                </Typography>
                <Checkbox
                    checked={step.completed}
                    value={step.completed}
                    onClick={event => event.stopPropagation()}
                    onChange={event=>onCompleteStepChange(event, step._id, step.goalId)} />

            </Grid>
        </Card>
    )
}

export default StepCard;