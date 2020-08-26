import React from 'react';
import PropTypes from 'prop-types';
import ButtonControl from '../ButtonControl';
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';
import FormatColorResetIcon from '@material-ui/icons/FormatColorReset';
import CheckIcon from '@material-ui/icons/Check';
import './styles.css';
import { isLightOrDark } from '../../../../utils/colorUtils';
import Button from '@material-ui/core/Button';

function ColorSelectorControl({
    selectedColor,
    onSelectColor,
    colors,
    colorsPerRow = 10,
    children,
    ...rest
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuId = Math.random().toString(36).substring(8);
    const colorRows = [[]];
    for (let i = 0, rowI = 0; i < colors.length; i++) {
        if (i % colorsPerRow === 0) {
            rowI++;
            colorRows[rowI] = [];
        }
        colorRows[rowI].push(colors[i]);
    }

    const handleOpen = (ev) => {
        setAnchorEl(ev.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <ButtonControl
                onClick={handleOpen}
                aria-controls={menuId}
                aria-haspopup="true"
                badgeColor={selectedColor ? selectedColor.color : null}
                {...rest}>
                {children}
            </ButtonControl>
            <Popover
                id={menuId}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <React.Fragment>
                    <Button
                        startIcon={<FormatColorResetIcon />}
                        fullWidth
                        color="secondary"
                        onClick={() => {
                            handleClose();
                            onSelectColor(null);
                        }}>
                        None
                    </Button>
                    {colorRows.map((colorRow, colorRowI) => (
                        <div key={`color-row-${colorRowI}`} className="mui-editor-color-row">
                            {colorRow.map((colorData) => (
                                <Tooltip key={colorData.value} title={colorData.text}>
                                    <div
                                        className="mui-editor-color-item"
                                        onClick={() => {
                                            handleClose();
                                            onSelectColor(colorData);
                                        }}
                                        style={{ backgroundColor: colorData.color }}>
                                        {selectedColor &&
                                        colorData.value === selectedColor.value ? (
                                            <CheckIcon
                                                style={{
                                                    color:
                                                        isLightOrDark(colorData.color) === 'dark'
                                                            ? '#fff'
                                                            : '#000',
                                                }}
                                            />
                                        ) : null}
                                    </div>
                                </Tooltip>
                            ))}
                        </div>
                    ))}
                </React.Fragment>
            </Popover>
        </React.Fragment>
    );
}

ColorSelectorControl.propTypes = {
    selectedColor: PropTypes.object,
    onSelectColor: PropTypes.func.isRequired,
    colors: PropTypes.array.isRequired,
    colorsPerRow: PropTypes.number,
    children: PropTypes.any,
};

export default ColorSelectorControl;
