import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays';
import { Typography, Grid, Button } from '@mui/material';
import type { Goal } from './types';
import query from 'tools/query';
import ColorSelect from 'components/colorSelect/ColorSelect';

function CreateGoal() {
    const navigate = useNavigate()
    const [error, setError] = useState();
    const [initialValues, setInitialValues] = useState<Goal>();
    const { goalId } = useParams();
    const userId = localStorage.getItem('userId');
    const isEdit = goalId;

    useEffect(() => {
        if (isEdit) {
            getGoalData(goalId);
        }
    }, [isEdit]);

    const getGoalData = async (goalId) => {
        try {
            const response = await query(`goals/details/${goalId}`, 'GET');
            const data = await response.json();
            setInitialValues(data);
        }
        catch (error) {
            setError(error.message)
        }
    }

    const onSubmit = async (values: Goal) => {
        const requestLink = isEdit ? `goals/${goalId}/update` : 'goals/create';
        const requestMethod = isEdit ? 'PUT' : 'POST';
        const body = {
            ...values,
            userId,
            lastEdited: Date.now(),
            createdDate: isEdit ? initialValues.createdDate : Date.now()
        }
        try {
            await query(requestLink, requestMethod, body);
            navigate(`/goalslist`);
        } catch (error) {
            setError(error.message);
        }
    }

    if (error) {
        return <Typography>{error}</Typography>
    }
    if (isEdit && !initialValues) {
        return (
            <Grid container item sx={{ justifyContent: 'center' }}>
                <Typography>Loading ...</Typography>
            </Grid>
        )
    }

    return (
        <Grid container sx={{ justifyContent: 'center' }} spacing={6}>
            <Grid container item sx={{ justifyContent: 'right' }}>
                <Button variant="contained" color='primary' onClick={() => navigate('/goalslist')}>Go home</Button>
            </Grid>
            <Grid container item sx={{ justifyContent: 'center' }}>
                <Form
                    onSubmit={onSubmit}
                    mutators={{
                        ...arrayMutators
                    }}
                    initialValues={{goalColor: '#FDFDA4',...initialValues}}
                    render={({ handleSubmit, form: {
                        mutators: { push }
                    }, }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid sx={{ justifyContent: 'center' }} container direction={'column'}>
                                <Grid item container sx={{ justifyContent: 'center' }}>
                                    <Grid item sx={{ marginRight: '8px' }}>
                                        <Typography>Name</Typography>
                                        <Field name='name' component='input' placeholder='Goal name' />
                                    </Grid>
                                    <Grid item sx={{ marginRight: '8px' }}>
                                        <Typography>Description</Typography>
                                        <Field name='description' component='input' placeholder='Goal Description' />
                                    </Grid>
                                    <Grid item>
                                        <Typography>Due Date</Typography>
                                        <Field name='dueDate' component='input' placeholder='Goal Due Date' />
                                    </Grid>
                                    <Button
                                        variant='contained'
                                        onClick={() => push('steps', undefined)}
                                        sx={{ margin: '16px', width: '100px' }}
                                        size={'small'}
                                    >
                                        Add Step
                                    </Button>
                                    <Field name='goalColor'>
                                        {({ input }) => <ColorSelect input={input} /> }
                                    </Field>

                                </Grid>
                                <Grid item>
                                    <FieldArray name='steps'>
                                        {({ fields }) =>
                                            fields.map((name, index) => (
                                                <Grid key={name} item>
                                                    <Typography>Step {index + 1}</Typography>
                                                    <Grid item container alignItems={'end'}>
                                                        <Grid item sx={{ marginRight: '8px' }}>
                                                            <Field
                                                                name={`${name}.name`}
                                                                component='input'
                                                                placeholder='Step name'
                                                            />
                                                        </Grid>
                                                        <Grid item sx={{ marginRight: '8px' }}>
                                                            <Field
                                                                name={`${name}.description`}
                                                                component='input'
                                                                placeholder='Step description'
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Field
                                                                name={`${name}.dueDate`}
                                                                component='input'
                                                                placeholder='Step Due Date'
                                                            />
                                                        </Grid>
                                                        <Grid item >
                                                            <Button
                                                                variant='contained'
                                                                color={'error'}
                                                                size={'small'}
                                                                sx={{ marginLeft: '16px' }}
                                                                onClick={() => fields.remove(index)}>
                                                                X
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            ))
                                        }
                                    </FieldArray>
                                </Grid>
                                <Button
                                    variant='contained'
                                    onClick={handleSubmit}
                                    sx={{ margin: '16px auto', width: '100px' }}>
                                    {goalId ? 'Update' : 'Create'}
                                </Button>
                            </Grid>
                        </form>
                    )} />
            </Grid>
        </Grid>
    )
}

export default CreateGoal;