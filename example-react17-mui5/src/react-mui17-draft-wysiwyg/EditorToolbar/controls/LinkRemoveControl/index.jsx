import React from 'react';
import useEditor from '../../../hooks/useEditor';
import { RichUtils } from 'draft-js';
import ButtonControl from '../core/ButtonControl';
import LinkOffIcon from '@mui/icons-material/LinkOff';

function LinkRemoveControl() {
    const editor = useEditor();

    const onClick = () => {
        const selection = editor.editorState.getSelection();
        editor.onChange(RichUtils.toggleLink(editor.editorState, selection, null));
    };

    return (
        <ButtonControl
            onClick={onClick}
            text={editor.translate('controls.linkRemove.title')}
            disabled={editor.editorState.getSelection().isCollapsed()}>
            <LinkOffIcon />
        </ButtonControl>
    );
}

export default LinkRemoveControl;
