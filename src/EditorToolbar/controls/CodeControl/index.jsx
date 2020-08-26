import React from 'react';
import useEditor from '../../../hooks/useEditor';
import ToggleInlineStyleButtonControl from '../core/ToggleInlineStyleButtonControl';
import CodeIcon from '@material-ui/icons/Code';
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
