import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays';
import type { Goal } from "./types";

function CreateGoal() {
    const navigate = useNavigate()
    const [error, setError] = useState();
    const [initialValues, setInitialValues] = useState();
    const { goalId } = useParams();

    useEffect(() => {
        if (goalId) {
            fetch(`http://localhost:4000/goals/${goalId}`)
                .then((res) => res.json())
                .then((data) => setInitialValues(data))
                .catch(error => setError(error))
        }
    }, [goalId]);

    async function onSubmit(values: Goal) {
        console.log(values)
        const requestLink = goalId ? `http://localhost:4000/goals/${goalId}/update` : 'http://localhost:4000/goals/create';
        const requestMethod = goalId ? 'PUT' : 'POST'
        try {
            await fetch(
                requestLink,
                {
                    method: requestMethod,
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            navigate(`/goalslist/${goalId}`)
        }
        catch (err) {
            setError(error)
        }
    }
    if (goalId && !initialValues) {
        return (
            <Grid container sx={{ justifyContent: 'center' }} spacing={6}>
                <Typography>Loading ...</Typography>
            </Grid>
        )
    }
    if (error) {
        return <Typography>{error}</Typography>
    }
    return (
        <Grid container sx={{ justifyContent: 'center' }} spacing={6}>
            <Grid item>
                <Typography variant='h3'>Create new Goal</Typography>
            </Grid>
            <Grid container item sx={{ justifyContent: 'center' }}>
                <Button variant='outlined' sx={{ marginRight: '16px' }} onClick={() => navigate('/')}>Go home</Button>
                <Button variant='outlined' onClick={() => navigate('/goalslist')}>See full list of goals</Button>
            </Grid>
            <Grid container item sx={{ justifyContent: 'center' }}>
                <Form
                    onSubmit={onSubmit}
                    mutators={{
                        ...arrayMutators
                    }}
                    initialValues={initialValues}
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