import React from 'react';
import useEditor from '../../../hooks/useEditor';
import useEditorFocus from '../../../hooks/useEditorFocus';
import { Modifier, EditorState } from 'draft-js';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ButtonControl from '../core/ButtonControl';
import './styles.css';

function TextAlignControl() {
    const editor = useEditor();
    const editorFocus = useEditorFocus();
    const [selectedTextAlign, setSelectedTextAlign] = React.useState(null);

    React.useEffect(() => {
        const selection = editor.editorState.getSelection();
        const currentBlock = editor.editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey());
        const blockData = currentBlock.getData();
        if (blockData && blockData.get('textAlign')) {
            setSelectedTextAlign(blockData.get('textAlign'));
        } else {
            setSelectedTextAlign(null);
        }
    }, [editor.editorState]);

    const toggle = (textAlign) => {
        setSelectedTextAlign(textAlign);
        const { editorState } = editor;
        const newContentState = Modifier.mergeBlockData(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            { textAlign }
        );
        editor.onChange(EditorState.push(editorState, newContentState, 'change-block-data'));
        editorFocus();
    };

    return (
        <React.Fragment>
            <ButtonControl
                active={selectedTextAlign === 'left'}
                onClick={() => toggle('left')}
                text={editor.translate('controls.textAlign.actions.alignLeft')}>
                <FormatAlignLeftIcon />
            </ButtonControl>
            <ButtonControl
                active={selectedTextAlign === 'center'}
                onClick={() => toggle('center')}
                text={editor.translate('controls.textAlign.actions.alignCenter')}>
                <FormatAlignCenterIcon />
            </ButtonControl>
            <ButtonControl
                active={selectedTextAlign === 'right'}
                onClick={() => toggle('right')}
                text={editor.translate('controls.textAlign.actions.alignRight')}>
                <FormatAlignRightIcon />
            </ButtonControl>
            <ButtonControl
                active={selectedTextAlign === 'justify'}
                onClick={() => toggle('justify')}
                text={editor.translate('controls.textAlign.actions.justify')}>
                <FormatAlignJustifyIcon />
            </ButtonControl>
        </React.Fragment>
    );
}

TextAlignControl.propTypes = {};

export default TextAlignControl;
