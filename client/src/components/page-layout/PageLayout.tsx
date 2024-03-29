import { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Header, FoldersList } from './components';
import createClasses from './styles';
import { AppContext } from 'tools/context';
import NextSteps from "../../pages/application/NextSteps/NextSteps";
import { fetchUserInfo } from 'store/userInfo/userInfoGet';

export function PageLayout(props) { //types
    const { content: InnerContent } = props;
    const classes = createClasses();
    const dispatch = useDispatch<any>();
    const { context } = useContext(AppContext);
    const isAuthenticated = context.isAuthenticated;
    const userId = localStorage.getItem('userId');
    const { userInfo }: any = useSelector(state => state);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchUserInfo(userId));
        }
    }, [isAuthenticated]);

    return (
        <Grid container className={classes.container}
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            wrap="nowrap"
        >
            <Grid container item padding={0.5}>
                <Header user={userInfo.data} />
            </Grid>

            <Grid
                className={classes.innerContainer}
                container
                item
                columns={12}
                direction="row"
                justifyContent="flex-start"
            >
                {isAuthenticated ?
                    <>
                        <Grid item xs={2} padding={2} pt={10} className={classes.scrollableContainer} sx={{ borderRight: '1px solid white' }}>
                            <FoldersList />
                        </Grid>

                        <Grid item xs={8} padding={2} className={classes.scrollableContainer}>
                            <InnerContent />
                        </Grid>
                        <Grid item xs={2} padding={2} pt={10} className={classes.scrollableContainer} sx={{ borderLeft: '1px solid white' }}>
                            <NextSteps />
                        </Grid>
                    </> :

                    <Grid item xs={12} padding={2} className={classes.scrollableContainer}>
                        <InnerContent />
                    </Grid>
                }

            </Grid>

        </Grid>
    )
}