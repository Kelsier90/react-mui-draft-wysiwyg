import React from 'react';
import useEditor from '../../../hooks/useEditor';
import ToggleBlockTypeButtonControl from '../core/ToggleBlockTypeButtonControl';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import blockStyles from '../../../types/blockStyles';

function OrderedListControl() {
    const editor = useEditor();

    return (
        <ToggleBlockTypeButtonControl
            blockType={blockStyles.OL}
            text={editor.translate('controls.orderedList.title')}>
            <FormatListNumberedIcon />
        </ToggleBlockTypeButtonControl>
    );
}

export default OrderedListControl;
