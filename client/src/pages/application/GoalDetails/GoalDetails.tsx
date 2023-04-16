import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { Checkbox, CardContent, Card, Typography, Grid, Button, Input } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import type { Event, Goal } from '../types';
import query from 'tools/query';
import convertDate from 'tools/convertDate';
import createClasses from './styles';
import ColorSelect from 'components/colorSelect/ColorSelect';
import FeaturesSelect from 'components/featuresSelect/FeaturesSelect';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function GoalDetails() {
    const navigate = useNavigate();
    const { goalId } = useParams<string>();
    const [goal, setGoal] = useState<Goal>();
    const [error, setError] = useState();
    const [isColorEdit, setIsColorEdit] = useState<boolean>(false);
    // const [isColorEdit, setIsColorEdit] = useState<boolean>(false);
    const localeCreatedDate = convertDate(goal?.createdDate);
    const localelastEditedDate = convertDate(goal?.lastEdited);
    const userId = localStorage.getItem('userId');
    const classes = createClasses();

    async function getGoal(goalId: string) {
        try {
            const response = await query(`goals/details/${goalId}`, 'GET');
            const data = await response.json();
            setGoal(data);
        } catch (error) {
            setError(error.message)
        }
    }
    useEffect(() => {
        getGoal(goalId);
    }, [goalId])

    async function onCompleteStepChange(id: string, event: Event) {
        const newValue = event.target.value === 'true';
        try {
            const response = await query(`steps/${goalId}/updateStepStatus/${id}`, 'PATCH', { completed: !newValue, lastEdited: Date.now() });
            const data = await response.json();
            getGoal(data._id);
        }
        catch (error) {
            setError(error.message)
        }
    }

    async function onCompleteGoalChange(id: string, event: Event) {
        const newValue = event.target.value === 'true';
        try {
            const response = await query(`goals/${id}/updateStatus`, 'PATCH', { completed: !newValue, lastEdited: Date.now() });
            const data = await response.json();
            getGoal(data._id);
        }
        catch (error) {
            setError(error.message)
        }
    }

    async function onDeleteClick(id: string) {
        try {
            await query(`goals/${id}/delete`, 'DELETE');
            navigate('/goalslist');
        } catch (err) {
            setError(error)
        }
    }

    async function onSubmit(values: Goal) {
        const requestLink = `goals/${goalId}/update`;
        const requestMethod = 'PUT';
        const body = {
            ...values,
            userId,
            steps: values.steps || [],
            lastEdited: Date.now(),
            createdDate: goal.createdDate
        }
        try {
            await query(requestLink, requestMethod, body);
            getGoal(goalId);
            setIsColorEdit(false)
        } catch (error) {
            setError(error.message);
        }
    }
    if (!goal) {
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
            <Grid container item sx={{ justifyContent: 'right' }}>
                <Button variant="contained" color='primary' onClick={() => navigate('/goalslist')}>go home</Button>
            </Grid>
            <Form
                onSubmit={onSubmit}
                mutators={{
                    ...arrayMutators
                }}
                initialValues={{ goalColor: goal.goalColor, ...goal }}
                render={({ handleSubmit, pristine, dirty, values, form: {
                    mutators: { push }
                } }) => (
                    <Grid container item direction={'row'} justifyContent='center'>
                        <Card sx={{ width: 700, minHeight: 500, background: values.goalColor, margin: '16px', display: 'flex', flexDirection: 'column' }} variant="outlined">

                            <CardContent>
                                <Grid container item justifyContent='flex-end' alignItems='center'>
                                    {!pristine && <Button size='small' onClick={handleSubmit}>Save Changes</Button>}
                                    <FeaturesSelect
                                        goalId={goalId}
                                        onDeleteClick={onDeleteClick}
                                        onChangeColorClick={() => setIsColorEdit(true)}
                                        onEditStepsClick={() => console.log("future")}
                                    />
                                    {/* {(isColorEdit || dirty) && <Button size='small' onClick={() => setIsColorEdit(false)}>Cancel</Button>} */}
                                    <DeleteIcon sx={{ cursor: 'pointer' }} color='primary' onClick={() => onDeleteClick(goal._id)} />
                                </Grid>

                                <Grid container item justifyContent='space-between' alignItems='flex-start' className={classes.topContainer}>
                                    <Checkbox
                                        checked={goal.completed}
                                        value={goal.completed}
                                        onChange={(event) => onCompleteGoalChange(goal._id, event)} />
                                    <Field name='name'>
                                        {({ input: { value, onChange } }) =>
                                            <TextareaAutosize
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
                                    <Button variant='text' onClick={() => push('steps', undefined)} startIcon={<AddIcon/>}>
                                        Add
                                    </Button>


                                    {isColorEdit && <Field name='goalColor'>
                                        {({ input }) => <ColorSelect input={input} />}
                                    </Field>}
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
                                                        <Checkbox
                                                            checked={isComplited}
                                                            value={isComplited}
                                                            onChange={(event) => onCompleteStepChange(stepId, event)} />
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

                            <Grid item container alignItems='center' justifyContent='flex-end' alignSelf='end'>
                                <Grid sx={{ color: 'gray' }} pr={1}>
                                    <Typography variant='body2'>{`Last Edited: ${localelastEditedDate}`}</Typography>
                                    <Typography variant='body2'>{`Created: ${localeCreatedDate}`}</Typography>
                                </Grid>
                            </Grid>

                        </Card>
                    </Grid>
                )
                } />
        </Grid >
    )
}

export default GoalDetails;