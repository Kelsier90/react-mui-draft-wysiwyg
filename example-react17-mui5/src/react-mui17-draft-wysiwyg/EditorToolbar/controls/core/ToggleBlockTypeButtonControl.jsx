import React from 'react';
import PropTypes from 'prop-types';
import useEditor from '../../../hooks/useEditor';
import useEditorFocus from '../../../hooks/useEditorFocus';
import { RichUtils } from 'draft-js';
import ButtonControl from './ButtonControl';

ToggleBlockTypeButtonControl.propTypes = {
    blockType: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    text: PropTypes.any,
};

function ToggleBlockTypeButtonControl({ blockType, children, text }) {
    const editor = useEditor();
    const editorFocus = useEditorFocus();

    const onClick = () => {
        const newEditorState = RichUtils.toggleBlockType(editor.editorState, blockType);
        editor.onChange(newEditorState);
        editorFocus();
    };

    return (
        <ButtonControl text={text} onClick={onClick}>
            {children}
        </ButtonControl>
    );
}

export default ToggleBlockTypeButtonControl;
