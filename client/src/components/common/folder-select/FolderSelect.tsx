import { Grid, Typography, Tooltip } from '@mui/material';
import createClasses from './styles';
import { Popper } from 'components/common';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

export function FolderSelect(props) { //types
    const classes = createClasses();
    const { value, folders, onChange } = props;

    return (
        <Popper
            placement='bottom'
            trigger={<Tooltip title='Move to Folder' placement='top'><DriveFileMoveIcon /></Tooltip>}
            content={<Grid sx={{ backgroundColor: 'white', color: 'black' }}>
                {folders.map(folder =>
                    <Grid container item alignItems='center'>
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