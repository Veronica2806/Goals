import { Grid } from '@mui/material';
import Header from '../header/Header';
import createClasses from './styles';
import NextSteps from "../nextSteps/NextSteps";

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
            <Grid container item padding={0.5}>
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

                <Grid item xs={2} padding={2} pt={10} className={classes.scrollableContainer}>
                    feature list of the folders

                </Grid>

                <Grid item xs={8} padding={2} className={classes.scrollableContainer}>
                    <InnerContent />
                </Grid>
                <Grid item xs={2} padding={2} pt={10} className={classes.scrollableContainer}>
                    <NextSteps />
                </Grid>
            </Grid>

        </Grid>
    )
}

export default PageLayout;