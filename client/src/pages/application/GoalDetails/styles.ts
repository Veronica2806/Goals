import makeStyles from "@mui/styles/makeStyles";

const createClasses = makeStyles(() => ({
    nameInput: {
            fontSize: '30px',
            border: 'none',
            backgroundColor: 'transparent',
            width: '90%',
            resize: 'none',
            outline: 'none'
    },
    descriptionInput: {
            fontSize: '20px',
            minHeight: '100px',
            height: 'auto',
            border: 'none',
            backgroundColor: 'transparent',
            width: '100%',
            resize: 'none',
            overflow: 'visible',
            outline: 'none',
            marginTop: '20px',
            borderBottom: '1px solid black',
    },
    topContainer: {
        borderBottom: '1px solid black',
    }
}));

export default createClasses;