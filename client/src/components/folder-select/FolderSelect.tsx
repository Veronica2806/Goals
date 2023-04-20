import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import createClasses from './styles';
import query from 'tools/query';
import Popper from 'components/popper/Popper';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

function FolderSelect(props) { //types
    const classes = createClasses();
    const { goal: { _id: goalId, folderId } } = props;
    const [folders, setFolders] = useState([])
    const [error, setError] = useState();

    const userId = localStorage.getItem('userId');


    async function getFolders() {
        try {
            const response = await query(`folder/${userId}`, 'GET');
            const data = await response.json();

            data.unshift({
                name: "All goals",
                _id: ""
            })
            setFolders(data);

        } catch (error) {
            setError(error.message)
        }
    }

    async function onFolderClick(event, folder) {
        event.stopPropagation();
        const { _id } = folder;
        await query(`goals/${goalId}/updateFolder`, 'patch', { folderId: _id });
    }

    useEffect(() => {
        getFolders()
    }, [])

    if (error) {
        return <Typography>{error}</Typography>
    }

    return (
        <Popper
            placement='bottom'
            trigger={<DriveFileMoveIcon />}
            content={<Grid sx={{ backgroundColor: 'white', color: 'black' }}>
                {folders.map(folder =>
                    <Grid container item alignItems='center'>
                        <Typography
                            role='button'
                            color={folder._id === folderId && 'error'}
                            onClick={(event) => onFolderClick(event, folder)}
                            className={classes.listItem}>
                            {folder.name}
                        </Typography>
                    </Grid>
                )}
            </Grid>}
        />
    )
}

export default FolderSelect;