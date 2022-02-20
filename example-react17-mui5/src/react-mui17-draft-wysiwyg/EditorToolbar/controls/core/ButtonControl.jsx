import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip, Badge } from '@mui/material';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    badge: (props) => ({
        background: props.badgeColor,
    }),
});

function ButtonControl({
    children,
    onClick,
    disabled = false,
    active = false,
    text = '',
    badgeColor = null,
    ...rest
}) {
    const classes = useStyles({ badgeColor });
    return (
        <Tooltip title={text} aria-disabled={disabled}>
            <span>
                <IconButton
                    onClick={onClick}
                    disabled={disabled}
                    color={active ? 'primary' : 'default'}
                    {...rest}>
                    <Badge
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        classes={{ badge: classes.badge }}
                        overlap="circular"
                        badgeContent=" "
                        invisible={badgeColor === null}
                        variant="dot">
                        {children}
                    </Badge>
                </IconButton>
            </span>
        </Tooltip>
    );
}

ButtonControl.propTypes = {
    children: PropTypes.any.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    text: PropTypes.any,
    badgeColor: PropTypes.any,
    active: PropTypes.bool,
};

export default ButtonControl;
