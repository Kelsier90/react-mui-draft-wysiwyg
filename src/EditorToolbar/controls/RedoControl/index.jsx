import React from 'react';
import useEditor from '../../../hooks/useEditor';
import useEditorFocus from '../../../hooks/useEditorFocus';
import { EditorState } from 'draft-js';
import ButtonControl from '../core/ButtonControl';
import RedoIcon from '@material-ui/icons/Redo';

function RedoControl() {
    const editor = useEditor();
    const editorFocus = useEditorFocus();

    const onClick = () => {
        editor.onChange(EditorState.redo(editor.editorState));
        editorFocus();
    };

    return (
        <ButtonControl onClick={onClick} text={editor.translate('controls.redo.title')}>
            <RedoIcon />
        </ButtonControl>
    );
}

export default RedoControl;
