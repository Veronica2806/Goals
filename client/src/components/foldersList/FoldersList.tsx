import { Grid, Button, Typography, Popper, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import createClasses from './styles';
import query from 'tools/query';

function FoldersList(props) { //types
    const classes = createClasses();
    const [folders, setFolders] = useState([])
    const [error, setError] = useState();
    const [inputValue, setInputValue] = useState("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const userId = localStorage.getItem('userId');
    const isAuthenticated = localStorage.getItem('AccessToken')

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    function onOutsideClick(event) {
        event.stopPropagation();
        setAnchorEl(null)
    }


    async function getFolders() {
        try {
            const response = await query(`folder/${userId}`, 'GET');
            const data = await response.json();
            setFolders(data);
        } catch (error) {
            setError(error.message)
        }
    }

    async function removeFolder(folderId: string) {
        try {
            await query(`folder/${folderId}`, 'DELETE');
            getFolders();
        } catch (error) {
            setError(error.message)
        }
    }

    async function createFolder(event) {
        event.stopPropagation();
        try {
            await query(`folder/${userId}`, 'PUT', { name: inputValue });
            setAnchorEl(null)
            getFolders();
            setInputValue("")
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            getFolders()
        }
    }, [isAuthenticated])

    document.addEventListener('click', onOutsideClick);

    if (error) {
        return <Typography>{error}</Typography>
    }

    if (!isAuthenticated) {
        return <Typography>not authenticated</Typography>
    }

    return (
        <Grid container direction='column' alignItems='flex-start'>
            <Button aria-describedby={id} type="button" onClick={(event) => {
                event.stopPropagation()
                setAnchorEl(anchorEl ? null : event.currentTarget)
            }}>
                Add folder
            </Button>

            <Popper id={id} open={open} anchorEl={anchorEl} placement='right' sx={{ backgroundColor: 'white' }}>
                <Input value={inputValue} onChange={event => setInputValue(event.target.value)} onClick={event => event.stopPropagation()} />
                <Button onClick={createFolder}>+</Button>
            </Popper>


            {folders.length ? folders.map(folder =>
                <Grid container item alignItems='center'>
                    {folder.name}
                    <Button color='error' onClick={() => removeFolder(folder._id)}>X</Button>
                </Grid>

            ) : 'no folders'}
        </Grid>)
}

export default FoldersList;