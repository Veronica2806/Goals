import { Grid } from '@mui/material';
import { Header, FoldersList} from './components';
import createClasses from './styles';
import NextSteps from "../../pages/application/NextSteps/NextSteps";

export function PageLayout(props) { //types
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

                <Grid item xs={2} padding={2} pt={10} className={classes.scrollableContainer} sx={{ borderRight: '1px solid white' }}>
                    <FoldersList />
                </Grid>

                <Grid item xs={8} padding={2} className={classes.scrollableContainer}>
                    <InnerContent />
                </Grid>
                <Grid item xs={2} padding={2} pt={10} className={classes.scrollableContainer} sx={{ borderLeft: '1px solid white' }}>
                    <NextSteps />
                </Grid>
            </Grid>

        </Grid>
    )
}