import { Grid, Button, Typography, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import createClasses from './styles';
import query from 'tools/query';
import Popper from 'components/popper/Popper';

function FoldersList(props) { //types
    const classes = createClasses();
    const navigate = useNavigate();
    const [folders, setFolders] = useState([])
    const [error, setError] = useState();
    const [inputValue, setInputValue] = useState("");
    const userId = localStorage.getItem('userId');
    const isAuthenticated = localStorage.getItem('AccessToken');

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
            getFolders();
            setInputValue("")
        } catch (error) {
            setError(error.message)
        }
    }

    function onFolderClick(folder) {
        const { _id } = folder;
        navigate(`/goalslist/${_id}`);
    }

    useEffect(() => {
        if (isAuthenticated) {
            getFolders()
        }
    }, [isAuthenticated])


    if (error) {
        return <Typography>{error}</Typography>
    }

    if (!isAuthenticated) {
        return <Typography>not authenticated</Typography>
    }

    return (
        <Grid container direction='column' alignItems='flex-start'>
            <Popper
                trigger='Add folder'
                content={<Grid sx={{ backgroundColor: 'white', color: 'black' }}>
                    <Input value={inputValue} onChange={event => setInputValue(event.target.value)} onClick={event => event.stopPropagation()} />
                    <Button onClick={createFolder}>+</Button>
                </Grid>}
            />

            {folders.length ? folders.map(folder =>
                <Grid container item alignItems='center'>
                    <Button onClick={() => onFolderClick(folder)}> {folder.name}</Button>
                    <Button color='error' onClick={() => removeFolder(folder._id)}>X</Button>
                </Grid>
            ) : 'no folders'}
        </Grid>)
}

export default FoldersList;