import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Typography, Grid, Button, Alert} from '@mui/material';
import createClasses from "./styles";
import query from 'tools/query';

const requestLink = 'auth/login';
const requestMethod = 'POST';

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState();
    const classes = createClasses();
    useEffect(() => {
        localStorage.removeItem('AccessToken');
    }, []);
    async function onSubmit(values) { //add types
        try {
            const response = await query(requestLink, requestMethod, values);
            if (response.ok) {
                const { token, user } = await response.json();
                localStorage.setItem('AccessToken', token);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('userId', user._id);
                navigate('/home')
            }
            else {
                const { message } = await response.json()
                throw new Error(message);
            }
        }
        catch (err) {
            setError(err.message)
        }
    }

    return (
        <Grid container sx={{ justifyContent: 'center' }} spacing={6}>
            {error && <Alert
                onClose={() => setError(undefined)}
                classes={{ root: classes.root }}
                variant="filled"
                severity="error">{error}</Alert>}
            <Grid item>
                <Typography variant='h3'>Hello</Typography>
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
                                <Grid item>
                                    <Typography>Password</Typography>
                                    <Field name='password' component='input' placeholder='password' />
                                </Grid>

                            </Grid>

                            <Button
                                variant='contained'
                                onClick={handleSubmit}
                                sx={{ margin: '16px auto', width: '100px' }}>
                                {"Login"}
                            </Button>
                            <Typography>Don't have an account?</Typography>
                            <Button
                                variant='contained'
                                onClick={() => navigate('/registration')}
                                sx={{ width: '200px' }}>
                                {"Create Account"}
                            </Button>

                        </Grid>
                    )} />
            </Grid>
        </Grid>
    )
}

export default Login;