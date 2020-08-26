import React from 'react';
import useEditor from '../../../hooks/useEditor';
import ToggleInlineStyleButtonControl from '../core/ToggleInlineStyleButtonControl';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import inlineStyles from '../../../types/inlineStyles';

function BoldControl() {
    const editor = useEditor();

    return (
        <ToggleInlineStyleButtonControl
            inlineStyle={inlineStyles.BOLD}
            text={editor.translate('controls.bold.title')}>
            <FormatBoldIcon />
        </ToggleInlineStyleButtonControl>
    );
}

export default BoldControl;
