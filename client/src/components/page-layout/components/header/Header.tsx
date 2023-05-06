import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Button, Grid, Typography } from '@mui/material';

import createClasses from "./styles";

export function Header(props) {
    const { user } = props;
    const navigate = useNavigate();
    const classes = createClasses();
    const isAuthenticated = localStorage.getItem('AccessToken') && user;

    function logout() {
        localStorage.removeItem('AccessToken');
        localStorage.removeItem('userId');
        navigate('/login')
    }

    return (
        <Grid container item className={classes.container} direction="row" wrap="nowrap" columns={12}>
            <Grid item container xs={9} >
                <Typography variant='h4'>Get your life organized</Typography>
            </Grid>


            {isAuthenticated &&
                <Grid item container direction="row" justifyContent="flex-end" alignItems="center" xs={3} >
                    <Typography mr={2}>{user.firstName} {user.lastName}</Typography>
                    <ButtonGroup>
                        <Button variant="contained" color='primary' onClick={logout}>Logout</Button>
                    </ButtonGroup>
                </Grid>
            }
        </Grid>
    )
}