import { Grid, Typography } from '@mui/material';
import createClasses from "./styles";

function Footer() {
    const classes = createClasses();
    
    return (
        <Grid container item xs={12} columns={2} className={classes.container}>
            <Typography variant='h4'>Your goals</Typography>
        </Grid>
    )
}

export default Footer;