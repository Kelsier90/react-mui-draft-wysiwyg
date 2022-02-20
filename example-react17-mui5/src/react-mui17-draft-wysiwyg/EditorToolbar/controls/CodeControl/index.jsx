import React from 'react';
import useEditor from '../../../hooks/useEditor';
import ToggleInlineStyleButtonControl from '../core/ToggleInlineStyleButtonControl';
import CodeIcon from '@mui/icons-material/Code';
import inlineStyles from '../../../types/inlineStyles';

function CodeControl() {
    const editor = useEditor();

    return (
        <ToggleInlineStyleButtonControl
            inlineStyle={inlineStyles.CODE}
            text={editor.translate('controls.code.title')}>
            <CodeIcon />
        </ToggleInlineStyleButtonControl>
    );
}

export default CodeControl;
