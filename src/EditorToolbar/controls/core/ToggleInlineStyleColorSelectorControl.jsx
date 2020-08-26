import React from 'react';
import PropTypes from 'prop-types';
import ColorSelectorControl from '../core/ColorSelectorControl';
import useEditor from '../../../hooks/useEditor';
import useEditorFocus from '../../../hooks/useEditorFocus';
import {
    getCurrentMappedInlineStyle,
    toggleMappedInlineStyle,
} from '../../../utils/editorStateUtils';

function ToggleInlineStyleColorSelectorControl({
    configuration,
    defaultConfiguration,
    pluginData,
    colorCssProp,
    inlineStyle,
    text,
    children,
}) {
    const editor = useEditor();
    const editorFocus = useEditorFocus();
    const [selectedColor, setSelectedColor] = React.useState(null);
    const options = configuration.options || defaultConfiguration.options;

    React.useEffect(() => {
        const selectededInlineStyle = getCurrentMappedInlineStyle(
            editor.editorState,
            Object.keys(pluginData.customStyleMap),
            null
        );
        setSelectedColor(
            selectededInlineStyle && pluginData.customStyleMap[selectededInlineStyle]
                ? {
                      color: pluginData.customStyleMap[selectededInlineStyle][colorCssProp],
                      value: selectededInlineStyle,
                  }
                : null
        );
    }, [editor.editorState, pluginData.customStyleMap, colorCssProp]);

    const handleSelectColor = (selectedColorData) => {
        setSelectedColor(selectedColorData);
        const newEditorState = toggleMappedInlineStyle(
            editor.editorState,
            Object.keys(pluginData.customStyleMap),
            selectedColorData ? selectedColorData.value : ''
        );
        editor.onChange(newEditorState);
        editorFocus();
    };

    return (
        <ColorSelectorControl
            text={text}
            onSelectColor={handleSelectColor}
            selectedColor={selectedColor}
            colorsPerRow={configuration.colorsPerRow || defaultConfiguration.colorsPerRow}
            disabled={editor.editorState.getSelection().isCollapsed()}
            colors={options.map((option) => ({
                text: option.text,
                color: option.value,
                value: `${inlineStyle}-${option.value}`,
            }))}>
            {children}
        </ColorSelectorControl>
    );
}

ToggleInlineStyleColorSelectorControl.propTypes = {
    configuration: PropTypes.object,
    defaultConfiguration: PropTypes.object.isRequired,
    pluginData: PropTypes.object.isRequired,
    colorCssProp: PropTypes.string.isRequired,
    inlineStyle: PropTypes.string.isRequired,
    text: PropTypes.string,
    children: PropTypes.any,
};

export default ToggleInlineStyleColorSelectorControl;
