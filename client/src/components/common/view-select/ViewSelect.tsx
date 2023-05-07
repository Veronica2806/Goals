import { Grid, Tooltip, IconButton } from '@mui/material';
import { Popper } from 'components/common';
import AppsIcon from '@mui/icons-material/Apps';
import TableRowsIcon from '@mui/icons-material/TableRows';

const viewOptions = {
    grid: {
        icon: <AppsIcon />,
        value: "grid",
        tooltipText: "Grid",
    },
    list: {
        icon: <TableRowsIcon />,
        value: "list",
        tooltipText: "List",
    }
}

export function ViewSelect(props) { //types
    const { value, onChange } = props;
    return (
        <Popper
            placement='bottom'
            trigger={
                <Tooltip title={viewOptions[value].tooltipText} placement='top' arrow={true}>
                    {viewOptions[value].icon}
                </Tooltip>}
            content={<Grid sx={{ backgroundColor: 'white', color: 'black' }}>
                {Object.keys(viewOptions).map((option, index) =>
                    <Grid container item alignItems='center' key={index}>
                        <Tooltip title={viewOptions[option].tooltipText} placement='right' arrow={true}>
                            <IconButton onClick={() => onChange(viewOptions[option].value)}>{viewOptions[option].icon}</IconButton>
                        </Tooltip>
                    </Grid>
                )}
            </Grid>}
        />
    )
}