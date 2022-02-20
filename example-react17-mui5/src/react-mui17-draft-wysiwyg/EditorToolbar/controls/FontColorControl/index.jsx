import React from 'react';
import PropTypes from 'prop-types';
import useEditor from '../../../hooks/useEditor';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import inlineStyles from '../../../types/inlineStyles';
import ToggleInlineStyleColorSelectorControl from '../core/ToggleInlineStyleColorSelectorControl';

function FontColorControl({ configuration, defaultConfiguration, pluginData }) {
    const editor = useEditor();

    return (
        <ToggleInlineStyleColorSelectorControl
            text={editor.translate('controls.fontColor.title')}
            configuration={configuration}
            defaultConfiguration={defaultConfiguration}
            inlineStyle={inlineStyles.FONT_COLOR}
            pluginData={pluginData}
            colorCssProp="color">
            <FormatColorTextIcon />
        </ToggleInlineStyleColorSelectorControl>
    );
}

FontColorControl.propTypes = {
    configuration: PropTypes.object,
    defaultConfiguration: PropTypes.object.isRequired,
    pluginData: PropTypes.object.isRequired,
};

export default FontColorControl;
