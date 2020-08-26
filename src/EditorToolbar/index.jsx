import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function EditorToolbar({ children, visible = true, ...rest }) {
    return (
        <Paper hidden={!visible} {...rest}>
            <Grid container alignItems="center">
                {children}
            </Grid>
        </Paper>
    );
}

EditorToolbar.propTypes = {
    children: PropTypes.any,
    visible: PropTypes.bool,
};

export default EditorToolbar;
