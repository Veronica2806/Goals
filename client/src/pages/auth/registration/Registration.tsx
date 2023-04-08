import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays';
import { Typography, Grid, Button} from '@mui/material';
import query from 'tools/query';

function Registration() {
    const navigate = useNavigate()
    const [error, setError] = useState();

    async function onSubmit(values) { //add types, validation
        try {
            await query('auth/registration', 'post', values);
            navigate('/login')
        }
        catch (error) {
            setError(error.message);
        }
    }
    if (error) {
        return <Typography>{error}</Typography>
    }
    return (
        <Grid container sx={{ justifyContent: 'center' }} spacing={6}>
            <Grid item>
                <Typography variant='h3'>New account</Typography>
            </Grid>

            <Grid container item sx={{ justifyContent: 'center' }}>
                <Form
                    onSubmit={onSubmit}
                    mutators={{
                        ...arrayMutators
                    }}
                    initialValues={[]}
                    render={({ handleSubmit }) => (
                        <Grid sx={{ justifyContent: 'center' }} container direction={'column'}>
                            <Grid item container sx={{ justifyContent: 'center' }}>
                                <Grid item sx={{ marginRight: '8px' }}>
                                    <Typography>Email</Typography>
                                    <Field name='email' component='input' placeholder='Email' />
                                </Grid>
                                <Grid item sx={{ marginRight: '8px' }}>
                                    <Typography>Fisrt name</Typography>
                                    <Field name='firstName' component='input' placeholder='Fisrtname' />
                                </Grid>
                                <Grid item sx={{ marginRight: '8px' }}>
                                    <Typography>Last name</Typography>
                                    <Field name='lastName' component='input' placeholder='Lastname' />
                                </Grid>
                                <Grid item>
                                    <Typography>Password</Typography>
                                    <Field name='password' component='input' placeholder='password' />
                                </Grid>

                            </Grid>

                            <Button
                                variant='contained'
                                onClick={handleSubmit}
                                sx={{ margin: '16px auto', width: '200px' }}>
                                {"Create an Account"}
                            </Button>
                            <Typography>Already have an account?</Typography>
                            <Button
                                variant='contained'
                                onClick={() => navigate('/login')}
                                sx={{ width: '100px' }}>
                                {"Login"}
                            </Button>
                        </Grid>
                    )} />
            </Grid>
        </Grid>
    )
}

export default Registration;