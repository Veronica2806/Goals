import makeStyles from "@mui/styles/makeStyles";

const createClasses = makeStyles(() => ({
    container: {
        height: '87vh',
    },
    innerContainer: {
        height: '86%',
    },
    scrollableContainer: {
        height: '100%',
        overflow: 'scroll'
    }
}));

export default createClasses;