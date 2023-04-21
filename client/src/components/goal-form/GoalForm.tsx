import { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { Checkbox, CardContent, Card, Typography, Grid, Button, Input, IconButton } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import convertDate from 'tools/convertDate';
import createClasses from './styles';
import { ColorSelect, FolderSelect } from 'components';

const newGoal = {
    steps: [],
    goalColor: "#FDFDA4"
}


export function GoalForm(props) {
    const { onSubmit, goal = newGoal, onDeleteClick, onCompleteGoalChange, onCompleteStepChange, goalId } = props;
    const isEdit = Boolean(goalId);
    const classes = createClasses();
    const localeCreatedDate = convertDate(goal?.createdDate);
    const localelastEditedDate = convertDate(goal?.lastEdited);

    useEffect(() => {
        if (!isEdit) {
            document.getElementById("title_texarea").focus();
        }
    }, [])

    return (
        <Form
            onSubmit={onSubmit}
            mutators={{
                ...arrayMutators
            }}
            initialValues={goal}
            render={({ handleSubmit, pristine, values, form: {
                mutators: { push }
            } }) => (
                <Grid container item direction={'row'} justifyContent='center'>
                    <Card sx={{ background: values.goalColor }} className={classes.goalCard} variant="outlined">

                        <CardContent>
                            <Grid container item justifyContent='flex-end' alignItems='center' wrap='nowrap'>
                                {(!pristine || !isEdit) && <Button size='small' onClick={handleSubmit}>Save Changes</Button>}
                                {isEdit && <FolderSelect goal={goal} />}
                                {isEdit && <IconButton color='primary' onClick={() => onDeleteClick(goal._id)}><DeleteIcon /></IconButton>}
                            </Grid>

                            <Grid container item justifyContent='space-between' alignItems='flex-start' className={classes.topContainer}>
                                {isEdit && <Checkbox
                                    checked={goal.completed}
                                    value={goal.completed}
                                    onChange={(event) => onCompleteGoalChange(goal._id, event)} />}
                                <Field name='name'>
                                    {({ input: { value, onChange } }) =>
                                        <TextareaAutosize
                                            id='title_texarea'
                                            maxRows={1}
                                            value={value}
                                            onChange={onChange}
                                            className={classes.nameInput}

                                        />}
                                </Field>
                            </Grid>

                            <Field name='description'>
                                {({ input: { value, onChange } }) =>
                                    <TextareaAutosize
                                        value={value}
                                        onChange={onChange}
                                        className={classes.descriptionInput}
                                        minRows={3}
                                        maxRows={100}
                                    />}
                            </Field>

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

                        </CardContent>

                        <Grid item container alignItems='center' alignSelf='end' justifyContent='space-between' className={classes.goalFooter}>
                            <Grid pl={2}>

                                <Field name='goalColor'>
                                    {({ input }) => <ColorSelect input={input} />}
                                </Field>
                            </Grid>
                            {isEdit && <Grid sx={{ color: 'gray' }} pr={1} >
                                <Typography variant='body2'>{`Last Edited: ${localelastEditedDate}`}</Typography>
                                <Typography variant='body2'>{`Created: ${localeCreatedDate}`}</Typography>
                            </Grid>}
                        </Grid>

                    </Card>
                </Grid>
            )
            } />
    )


}
