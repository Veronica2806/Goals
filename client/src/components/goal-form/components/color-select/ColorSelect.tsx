import { IconButton, Tooltip } from '@mui/material';
import createClasses from './styles';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { Popper } from 'components/common';

const colorsMap = {
    Yellow: '#FDFDA4',
    BurlyWood: '#DEB887',
    LightSkyBlue: '#87CEFA',
    PaleGreen: '#98FB98',
    LightSalmon: '#FFA07A',
}

export function ColorSelect(props) {
    const { input: { value, onChange } } = props;
    const classes = createClasses();

    return (
        <Popper
            trigger={
                <Tooltip title='Change color' placement='top'><IconButton
                    color='primary'>
                    <ColorLensIcon />
                </IconButton>
                </Tooltip>
            }
            content={
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
            }
        />
    )
}