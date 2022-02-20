import React from 'react';
import PropTypes from 'prop-types';
import useEditor from '../../../hooks/useEditor';
import useEditorFocus from '../../../hooks/useEditorFocus';
import DropdownControl from '../core/DropdownControl';
import inlineStyles from '../../../types/inlineStyles';
import {
    getCurrentMappedInlineStyle,
    toggleMappedInlineStyle,
} from '../../../utils/editorStateUtils';

FontSizeControl.propTypes = {
    pluginData: PropTypes.object.isRequired,
};

function FontSizeControl({ pluginData }) {
    const editor = useEditor();
    const editorFocus = useEditorFocus();
    const [selectedFontSizeStyle, setSelectedFontSizeStyle] = React.useState(
        `${inlineStyles.FONT_SIZE}-default`
    );
    const styleKeys = Object.keys(pluginData.customStyleMap);

    React.useEffect(() => {
        setSelectedFontSizeStyle(
            getCurrentMappedInlineStyle(
                editor.editorState,
                styleKeys,
                `${inlineStyles.FONT_SIZE}-default`
            )
        );
    }, [editor.editorState, styleKeys]);

    const handleChange = (newInlineStyle) => {
        setSelectedFontSizeStyle(newInlineStyle);
        const newEditorState = toggleMappedInlineStyle(
            editor.editorState,
            styleKeys,
            newInlineStyle
        );
        editor.onChange(newEditorState);
        editorFocus();
    };

    return (
        <DropdownControl
            options={styleKeys.map((inlineStyle) => ({
                text: pluginData.customStyleMap[inlineStyle].fontSize ? (
                    <span style={{ fontSize: pluginData.customStyleMap[inlineStyle].fontSize }}>
                        {pluginData.customStyleMap[inlineStyle].fontSize}
                    </span>
                ) : (
                    'default'
                ),
                value: inlineStyle,
            }))}
            onChange={handleChange}
            renderValue={(style) =>
                pluginData.customStyleMap[style].fontSize ||
                editor.translate('controls.fontSize.labels.default')
            }
            value={selectedFontSizeStyle}
            minWidth={50}
        />
    );
}

export default FontSizeControl;
