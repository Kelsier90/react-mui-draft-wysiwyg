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

function FontFamilyControl({ pluginData }) {
    const editor = useEditor();
    const editorFocus = useEditorFocus();
    const [selectedFontFamilyStyle, setSelectedFontFamilyStyle] = React.useState(
        `${inlineStyles.FONT_FAMILY}-default`
    );
    const styleKeys = Object.keys(pluginData.customStyleMap);

    React.useEffect(() => {
        setSelectedFontFamilyStyle(
            getCurrentMappedInlineStyle(
                editor.editorState,
                styleKeys,
                `${inlineStyles.FONT_FAMILY}-default`
            )
        );
    }, [editor.editorState, styleKeys]);

    const handleChange = (newInlineStyle) => {
        setSelectedFontFamilyStyle(newInlineStyle);
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
                value: inlineStyle,
                text: pluginData.customStyleMap[inlineStyle].fontFamily ? (
                    <span
                        style={{
                            fontFamily: pluginData.customStyleMap[inlineStyle].fontFamily,
                        }}>
                        {pluginData.customStyleMap[inlineStyle].fontFamily}
                    </span>
                ) : (
                    'default'
                ),
            }))}
            onChange={handleChange}
            value={selectedFontFamilyStyle}
        />
    );
}

FontFamilyControl.propTypes = {
    pluginData: PropTypes.any.isRequired,
};

export default FontFamilyControl;
