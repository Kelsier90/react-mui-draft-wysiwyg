import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem } from '@mui/material';
import { makeStyles } from "@mui/styles";
import useEditor from '../../../hooks/useEditor';
import { translateLiteralWithPrefix } from '../../../utils/translateUtils';

const useStyles = makeStyles((theme) => ({
    selectControl: {
        margin: theme.spacing(1),
    },
}));

function DropdownControl({ value, onChange, options, minWidth = 120, ...rest }) {
    const classes = useStyles();
    const editor = useEditor();

    return (
        <Select
            value={value}
            onChange={(ev) => onChange(ev.target.value)}
            className={classes.selectControl}
            style={{ minWidth }}
            {...rest}>
            {options.map((option) => (
                <MenuItem key={option.value || 'empty'} value={option.value}>
                    {option.text ? translateLiteralWithPrefix(option.text, editor.translate) : ''}
                </MenuItem>
            ))}
        </Select>
    );
}

DropdownControl.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    minWidth: PropTypes.number,
};

export default DropdownControl;
