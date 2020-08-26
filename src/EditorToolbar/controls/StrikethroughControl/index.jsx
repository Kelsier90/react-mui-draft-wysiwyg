import React from 'react';
import useEditor from '../../../hooks/useEditor';
import ToggleInlineStyleButtonControl from '../core/ToggleInlineStyleButtonControl';
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';
import inlineStyles from '../../../types/inlineStyles';

function StrikethroughControl() {
    const editor = useEditor();

    return (
        <ToggleInlineStyleButtonControl
            inlineStyle={inlineStyles.STRIKETHROUGH}
            text={editor.translate('controls.strikethrough.title')}>
            <FormatStrikethroughIcon />
        </ToggleInlineStyleButtonControl>
    );
}

export default StrikethroughControl;
