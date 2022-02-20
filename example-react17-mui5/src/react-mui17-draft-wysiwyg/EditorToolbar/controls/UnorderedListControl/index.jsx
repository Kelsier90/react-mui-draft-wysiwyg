import React from 'react';
import useEditor from '../../../hooks/useEditor';
import ToggleBlockTypeButtonControl from '../core/ToggleBlockTypeButtonControl';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

function UnorderedListControl() {
    const editor = useEditor();

    return (
        <ToggleBlockTypeButtonControl
            blockType="unordered-list-item"
            text={editor.translate('controls.unorderedList.title')}>
            <FormatListBulletedIcon />
        </ToggleBlockTypeButtonControl>
    );
}

export default UnorderedListControl;
