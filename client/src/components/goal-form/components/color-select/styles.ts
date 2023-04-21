import makeStyles from '@mui/styles/makeStyles';

const createClasses = makeStyles(() => ({
    menuItem: {
        height: '34px',
        width: '34px',
        borderRadius: '50%',
        display: 'flex',
        cursor: 'pointer',
        boxSizing: 'border-box'
    },
    container: {
        widht: '10px',

    },
    colorIndicator: {
        height: '20px',
        width: '20px',
        marginRight: '15px',
        border: '1px solid gray'
    },
    colorsContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '200px',
        backgroundColor: '#22160B',
        padding: '10px',
        justifyContent: 'space-between',
        borderRadius: '5px',
    }
}));

export default createClasses;