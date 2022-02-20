import React from 'react';
import PropTypes from 'prop-types';
import DropdownControl from '../core/DropdownControl';
import useEditor from '../../../hooks/useEditor';
import useEditorFocus from '../../../hooks/useEditorFocus';
import { RichUtils } from 'draft-js';
import { getCurrentBlockType } from '../../../utils/editorStateUtils';

function BlockTypeControl({ configuration, defaultConfiguration }) {
    const editor = useEditor();
    const editorFocus = useEditorFocus();
    const options = configuration.options || defaultConfiguration.options;
    const [value, setValue] = React.useState('default');

    React.useEffect(() => {
        setValue(
            getCurrentBlockType(
                editor.editorState,
                options.map((option) => option.value)
            )
        );
    }, [editor, options]);

    const handleChange = (newValue) => {
        setValue(newValue);
        const newEditorState = RichUtils.toggleBlockType(
            editor.editorState,
            newValue === 'normal' ? '' : newValue
        );
        editor.onChange(newEditorState);
        editorFocus();
    };

    return <DropdownControl options={options} onChange={handleChange} value={value} />;
}

BlockTypeControl.propTypes = {
    configuration: PropTypes.any,
    defaultConfiguration: PropTypes.any.isRequired,
};

export default BlockTypeControl;
