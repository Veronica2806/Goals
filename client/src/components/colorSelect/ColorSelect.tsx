import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import createClasses from './styles';

const colorsMap = {
    Yellow: '#FDFDA4',
    BurlyWood: '#DEB887',
    LightSkyBlue: '#87CEFA',
    PaleGreen: '#98FB98',
    LightSalmon: '#FFA07A',
}

function ColorIndicator({ value }) {
    const classes = createClasses();
    return <div className={classes.colorIndicator} style={{ backgroundColor: value }} />
}

function ColorSelect(props) {
    const { input: { value, onChange } } = props;
    const classes = createClasses();

    return (
        <FormControl>
            <InputLabel id='goal-color'>Goal color</InputLabel>
            <Select
                labelId='goal-color'
                id='goal-color-select'
                value={value}
                label='Goal color'
                onChange={(value) => onChange(value.target.value)}
                renderValue={() => <ColorIndicator value={value} />}
            >
                {Object.keys(colorsMap).map(key =>
                    <MenuItem className={classes.menuItem} style={{ backgroundColor: colorsMap[key] }} value={colorsMap[key]} key={key}>
                        {key}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

export default ColorSelect;