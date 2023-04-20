import makeStyles from "@mui/styles/makeStyles";

const createClasses = makeStyles(() => ({
    listItem: {
        cursor: "pointer",
        width: "100%",
        padding:"8px",
        '&:hover':{
            backgroundColor: "#E5DFDA"
        },
    }
}));

export default createClasses;