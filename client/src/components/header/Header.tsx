import { useNavigate } from 'react-router-dom';
import { ButtonGroup, Button, Grid, Typography } from '@mui/material';

import createClasses from "./styles";

function Header() {
    const navigate = useNavigate();
    const classes = createClasses();
    const isAuthenticated = localStorage.getItem('AccessToken');
    function logout() {
        localStorage.removeItem('AccessToken');
        navigate('/login')
    }

    return (
        <Grid container item  className={classes.container}>
            <Typography variant='h4'>Your goals</Typography>
            {isAuthenticated &&
                <ButtonGroup>
                    <Button onClick={logout}>Logout</Button>
                </ButtonGroup>
            }
        </Grid>
    )
}

export default Header;