import { Button, Popper as MuiPopper } from '@mui/material';
import { useState } from 'react';


function Popper(props) { //types
    const { trigger, content, placement = 'right' } = props
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    function onOutsideClick(event) {
        event.stopPropagation();
        setAnchorEl(null)
    }

    document.addEventListener('click', onOutsideClick);

    return (
        <>
            <Button aria-describedby={id} type="button" onClick={(event) => {
                event.stopPropagation()
                setAnchorEl(anchorEl ? null : event.currentTarget)
            }}>
               {trigger}
            </Button>

            <MuiPopper id={id} open={open} anchorEl={anchorEl} placement={placement}>
               {content}
            </MuiPopper>
        </>
    )
}

export default Popper;