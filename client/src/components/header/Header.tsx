import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Button, Grid, Typography } from '@mui/material';

import createClasses from "./styles";

function Header() {
    const navigate = useNavigate();
    const classes = createClasses();

    const user = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    const isAuthenticated = localStorage.getItem('AccessToken') && user;
    function logout() {
        localStorage.removeItem('AccessToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        navigate('/login')
    }

    return (
        <Grid container item className={classes.container} direction="row" wrap="nowrap" columns={12}>
            <Grid item container xs={9} >
                <Typography variant='h4'>Your goals</Typography>
            </Grid>


            {isAuthenticated &&
                <Grid item container direction="row" justifyContent="flex-end" alignItems="center" xs={3} >
                    <Typography mr={2}>{userObj.firstName} {userObj.lastName}</Typography>
                    <ButtonGroup>
                        <Button variant="contained" color='primary' onClick={logout}>Logout</Button>
                    </ButtonGroup>
                </Grid>
            }
        </Grid>
    )
}

export default Header;