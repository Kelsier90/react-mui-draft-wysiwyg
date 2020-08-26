import React from 'react';
import useEditor from '../../../hooks/useEditor';
import ToggleInlineStyleButtonControl from '../core/ToggleInlineStyleButtonControl';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import inlineStyles from '../../../types/inlineStyles';

function ItalicControl() {
    const editor = useEditor();

    return (
        <ToggleInlineStyleButtonControl
            inlineStyle={inlineStyles.ITALIC}
            text={editor.translate('controls.italic.title')}>
            <FormatItalicIcon />
        </ToggleInlineStyleButtonControl>
    );
}

export default ItalicControl;
