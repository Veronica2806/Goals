import { Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays';
import { Checkbox, Grid, Input, Typography, Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';


export function GoalSteps(props) {
    const { goal, onCompleteStepChange, isEdit, push } = props;

    return (
        <>
            <Grid container item justifyContent='left' alignItems='center'>
                <Typography variant='h6'>
                    Steps:
                </Typography>
                <Button variant='text' onClick={() => push('steps', undefined)} startIcon={<AddIcon />}>
                    Add
                </Button>

            </Grid>
            <FieldArray name='steps'>
                {({ fields }) =>
                    fields.map((name, index) => {
                        const isComplited = goal.steps[index]?.completed || false
                        const stepId = goal.steps[index]?._id || "";
                        return (<Grid key={name} item>
                            <Grid item container alignItems={'end'}>
                                <Grid container item alignItems='center'>
                                    <Field name={`${name}.name`}>
                                        {({ input }) => <Input {...input} />}
                                    </Field>
                                    {isEdit && <Checkbox
                                        checked={isComplited}
                                        value={isComplited}
                                        onChange={(event) => onCompleteStepChange(stepId, event)} />}
                                    <HighlightOffIcon
                                        sx={{ cursor: 'pointer' }}
                                        fontSize='small'
                                        color='error'
                                        onClick={() => fields.remove(index)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        )
                    }
                    )
                }
            </FieldArray>
        </>
    )
}
