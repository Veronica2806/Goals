import { IconButton } from '@mui/material';
import { useState } from 'react';
import createClasses from './styles';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import {Popper, Tooltip} from '@mui/material';

const colorsMap = {
    Yellow: '#FDFDA4',
    BurlyWood: '#DEB887',
    LightSkyBlue: '#87CEFA',
    PaleGreen: '#98FB98',
    LightSalmon: '#FFA07A',
}

function ColorSelect(props) {
    const { input: { value, onChange } } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const classes = createClasses();
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    function onOutsideClick(event) {
        event.stopPropagation();
        setAnchorEl(null)
    }

    document.addEventListener('click', onOutsideClick);

    return (
        <>
            <Tooltip title='Change color' placement='top'><IconButton aria-describedby={id} type="button" onClick={(event) => {
                event.stopPropagation()
                setAnchorEl(anchorEl ? null : event.currentTarget)
            }}
                color='primary'>
                <ColorLensIcon />
            </IconButton>
            </Tooltip>
            <Popper id={id} open={open} anchorEl={anchorEl} placement='top'>
                <div className={classes.colorsContainer} onClick={event => event.stopPropagation()}>
                    {Object.keys(colorsMap).map(key =>
                        <div
                            className={classes.menuItem}
                            style={{ backgroundColor: colorsMap[key], border: colorsMap[key] === value ? '2px solid red' : 'none' }}
                            onClick={(event) => {
                                event.stopPropagation()
                                onChange(colorsMap[key])
                            }} />
                    )}
                </div>
            </Popper>
        </>
    )
}

export default ColorSelect;