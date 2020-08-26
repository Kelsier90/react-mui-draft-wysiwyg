import React from 'react';
import useEditor from '../../../hooks/useEditor';
import useEditorFocus from '../../../hooks/useEditorFocus';
import { EditorState } from 'draft-js';
import ButtonControl from '../core/ButtonControl';
import UndoIcon from '@material-ui/icons/Undo';

function UndoControl() {
    const editor = useEditor();
    const editorFocus = useEditorFocus();

    const onClick = () => {
        editor.onChange(EditorState.undo(editor.editorState));
        editorFocus();
    };

    return (
        <ButtonControl onClick={onClick} text={editor.translate('controls.undo.title')}>
            <UndoIcon />
        </ButtonControl>
    );
}

export default UndoControl;
