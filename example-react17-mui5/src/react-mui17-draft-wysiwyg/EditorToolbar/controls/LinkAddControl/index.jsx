import React from 'react';
import useEditor from '../../../hooks/useEditor';
import useEditorFocus from '../../../hooks/useEditorFocus';
import ButtonControl from '../core/ButtonControl';
import LinkIcon from '@mui/icons-material/Link';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@mui/material";
import entities from '../../../types/entities';
import { applyEntityToCurrentSelection } from '../../../utils/editorStateUtils';

function LinkAddControl() {
    const editor = useEditor();
    const editorFocus = useEditorFocus();
    const [isDialogOpened, setIsDialogOpened] = React.useState(false);
    const [link, setLink] = React.useState('');
    const formRef = React.createRef();

    const onClick = () => {
        setLink('');
        setIsDialogOpened(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpened(false);
    };

    const onChangeLink = (ev) => {
        setLink(ev.currentTarget.value);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (link === '') return;
        handleCloseDialog();
        editor.onChange(
            applyEntityToCurrentSelection(editor.editorState, entities.LINK, 'MUTABLE', {
                url: link,
            })
        );
        editorFocus();
    };

    return (
        <React.Fragment>
            <ButtonControl
                onClick={onClick}
                text={editor.translate('controls.linkAdd.title')}
                disabled={editor.editorState.getSelection().isCollapsed()}>
                <LinkIcon />
            </ButtonControl>
            <Dialog open={isDialogOpened} onClose={handleCloseDialog}>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            label={editor.translate('controls.linkAdd.labels.link')}
                            value={link}
                            onChange={onChangeLink}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="button" onClick={handleCloseDialog} color="primary">
                            {editor.translate('controls.linkAdd.actions.cancel')}
                        </Button>
                        <Button type="submit" color="primary" disabled={link === ''}>
                            {editor.translate('controls.linkAdd.actions.add')}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}

export default LinkAddControl;
