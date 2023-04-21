import { useEffect } from 'react';
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays';
import { Checkbox, CardContent, Card, Typography, Grid, Button, IconButton } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import DeleteIcon from '@mui/icons-material/Delete';
import convertDate from 'tools/convertDate';
import createClasses from './styles';
import { FolderSelect } from 'components/common';
import { GoalSteps, ColorSelect } from './components';

const newGoal = {
    steps: [],
    goalColor: "#FDFDA4",
    folderId: ""
}

export function GoalForm(props) {
    const { onSubmit, goal = newGoal, onDeleteClick, onCompleteGoalChange, onCompleteStepChange, goalId, onFolderClick, folders } = props;
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

                                <Field name='folderId'>
                                    {({ input }) => <FolderSelect folders={folders} onChange={isEdit ? onFolderClick : input.onChange} value={input.value} />}
                                </Field>

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

                            <GoalSteps
                                goal={goal}
                                isEdit={isEdit}
                                push={push}
                                onCompleteStepChange={onCompleteStepChange} />

                        </CardContent>

                        <Grid item container alignItems='center' alignSelf='end' justifyContent='space-between'>
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
