import React from 'react';
import PropTypes from 'prop-types';
import useEditor from '../../../hooks/useEditor';
import useEditorFocus from '../../../hooks/useEditorFocus';
import { RichUtils } from 'draft-js';
import ButtonControl from './ButtonControl';
import { hasAllSelectionTheInlineStyle } from '../../../utils/editorStateUtils';

ToggleInlineStyleButtonControl.propTypes = {
    inlineStyle: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    text: PropTypes.any,
};

function ToggleInlineStyleButtonControl({ inlineStyle, children, text }) {
    const editor = useEditor();
    const editorFocus = useEditorFocus();
    const [isActive, setIsActive] = React.useState(false);

    React.useEffect(() => {
        setIsActive(hasAllSelectionTheInlineStyle(editor.editorState, inlineStyle));
    }, [editor.editorState, inlineStyle]);

    const onClick = () => {
        const newEditorState = RichUtils.toggleInlineStyle(editor.editorState, inlineStyle);
        editor.onChange(newEditorState);
        editorFocus();
    };

    return (
        <ButtonControl
            text={text}
            onClick={onClick}
            active={isActive}
            disabled={editor.editorState.getSelection().isCollapsed()}>
            {children}
        </ButtonControl>
    );
}

export default ToggleInlineStyleButtonControl;
