import { Grid, Button, Typography, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoldersList } from 'store/foldersList/foldersList';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import createClasses from './styles';
import query from 'tools/query';
import { Popper } from 'components/common';

export function FoldersList(props) { //types
    const classes = createClasses();
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const [error, setError] = useState();
    const [inputValue, setInputValue] = useState("");
    const userId = localStorage.getItem('userId');
    const isAuthenticated = localStorage.getItem('AccessToken');
    const { foldersList }: any = useSelector(state => state)

    async function removeFolder(folderId: string) {
        try {
            await query(`folder/${folderId}`, 'DELETE');
            dispatch(fetchFoldersList(userId));
        } catch (error) {
            setError(error.message)
        }
    }

    async function createFolder(event) {
        event.stopPropagation();
        try {
            await query(`folder/${userId}`, 'PUT', { name: inputValue });
            dispatch(fetchFoldersList(userId));
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
        if (isAuthenticated && !foldersList.data) {
            dispatch(fetchFoldersList(userId));
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

            {foldersList.data?.length && foldersList.data.map(folder =>
                <Grid container item alignItems='center' key={folder._id}>
                    <Button onClick={() => onFolderClick(folder)}> {folder.name}</Button>
                    {folder._id && <Button color='error' onClick={() => removeFolder(folder._id)}>X</Button>}
                </Grid>
            )}
        </Grid>)
}