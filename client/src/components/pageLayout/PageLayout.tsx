import { Grid } from '@mui/material';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import createClasses from './styles';

function PageLayout(props) { //types
    const { content: InnerContent } = props;
    const classes = createClasses();

    return (
        <Grid container className={classes.container}
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            wrap="nowrap"
        >
            <Grid container item>
                <Header />
            </Grid>

            <Grid
                className={classes.innerContainer}
                container
                item
                columns={12}
                direction="row"
                justifyContent="flex-start"
            >

                <Grid item xs={2} sx={{ border: '1px solid black' }} padding={2} className={classes.scrollableContainer}>
                    feature list of the folders

                </Grid>

                <Grid item xs={8} sx={{ border: '1px solid black' }} padding={2} className={classes.scrollableContainer}>
                    <InnerContent />
                </Grid>

                <Grid item xs={2} sx={{ border: '1px solid black' }} padding={2} className={classes.scrollableContainer}>
                    some content
                </Grid>
            </Grid>

            <Grid container item>
                <Footer />
            </Grid>

        </Grid>
    )
}

export default PageLayout;