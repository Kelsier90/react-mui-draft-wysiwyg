import React from 'react';
import PropTypes from 'prop-types';
import useEditor from '../../../hooks/useEditor';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import inlineStyles from '../../../types/inlineStyles';
import ToggleInlineStyleColorSelectorControl from '../core/ToggleInlineStyleColorSelectorControl';

function FontBackgroundColorControl({ configuration, defaultConfiguration, pluginData }) {
    const editor = useEditor();

    return (
        <ToggleInlineStyleColorSelectorControl
            text={editor.translate('controls.fontBackgroundColor.title')}
            configuration={configuration}
            defaultConfiguration={defaultConfiguration}
            inlineStyle={inlineStyles.FONT_BACKGROUND}
            pluginData={pluginData}
            colorCssProp="backgroundColor">
            <BorderColorIcon />
        </ToggleInlineStyleColorSelectorControl>
    );
}

FontBackgroundColorControl.propTypes = {
    configuration: PropTypes.object,
    defaultConfiguration: PropTypes.object.isRequired,
    pluginData: PropTypes.object.isRequired,
};

export default FontBackgroundColorControl;
