import { Grid, Typography, Tooltip } from '@mui/material';
import createClasses from './styles';
import { Popper } from 'components/common';
import { useSelector } from 'react-redux';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

export function FolderSelect(props) { //types
    const classes = createClasses();
    const { value, onChange } = props;
    const { foldersList: { data: folders } }: any = useSelector(state => state);

    return (
        <Popper
            placement='bottom'
            trigger={
                <Tooltip title='Move to Folder' placement='top' arrow={true}>
                    <DriveFileMoveIcon />
                </Tooltip>}
            content={<Grid sx={{ backgroundColor: 'white', color: 'black' }}>
                {folders.map(folder =>
                    <Grid container item alignItems='center' key={folder._id}>
                        <Typography
                            role='button'
                            color={folder._id === value && 'error'}
                            onClick={() => onChange(folder._id)}
                            className={classes.listItem}>
                            {folder.name}
                        </Typography>
                    </Grid>
                )}
            </Grid>}
        />
    )
}