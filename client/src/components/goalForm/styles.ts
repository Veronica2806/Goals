import makeStyles from "@mui/styles/makeStyles";

const createClasses = makeStyles(() => ({
    nameInput: {
            fontSize: '30px',
            border: 'none',
            backgroundColor: 'transparent',
            width: '90%',
            resize: 'none',
            outline: 'none',
            fontFamily: 'Montserrat',
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
            fontFamily: 'Montserrat',
    },
    topContainer: {
        paddingBottom: '8px',
        borderBottom: '1px solid black',
    },
    goalFooter: {
        // borderTop: '1px solid rgba(236, 236, 236, 0.43)',
        // backgroundColor: 'rgba(236, 236, 236, 0.43)',
        // boxShadow: '0px 1px 10px 10px rgba(236, 236, 236, 0.43)'
    },
    goalCard: {
        width: 700, 
        minHeight: 500, 
        margin: '16px', 
        display: 'flex', 
        flexDirection: 'column'
    }
}));

export default createClasses;