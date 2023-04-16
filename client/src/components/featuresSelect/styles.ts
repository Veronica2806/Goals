import makeStyles from '@mui/styles/makeStyles';

const createClasses = makeStyles(() => ({
    menuItem: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '34px',
        padding: '2px'
    },
    container: {
        widht: '10px',

    },
    colorIndicator: {
        height: '20px',
        width: '20px',
        marginRight: '15px',
        border: '1px solid gray'
    }
}));

export default createClasses;