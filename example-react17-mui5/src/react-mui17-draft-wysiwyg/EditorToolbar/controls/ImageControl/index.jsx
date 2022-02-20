import React from 'react';
import PropTypes from 'prop-types';
import useEditor from '../../../hooks/useEditor';
import useEditorFocus from '../../../hooks/useEditorFocus';
import ButtonControl from '../core/ButtonControl';
import ImageIcon from '@mui/icons-material/Image';
import { Popover, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import LinkIcon from '@mui/icons-material/Link';
import entities from '../../../types/entities';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import ByUrlDialog from './dialogs/ByURLDialog';
import UploadDialog from './dialogs/UploadDialog';
import ResizeImageDialog from './dialogs/ResizeImageDialog';

function ImageControl({ configuration, defaultConfiguration }) {
    const editor = useEditor();
    const editorFocus = useEditorFocus();
    const menuId = Math.random().toString(36).substring(8);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isUploadDialogOpened, setIsUploadDialogOpened] = React.useState(false);
    const [isUrlDialogOpened, setIsUrlDialogOpened] = React.useState(false);
    const uploadCallback = configuration.uploadCallback || defaultConfiguration.uploadCallback;

    const imageEntityToResize = editor.resizeImageEntityKey
        ? editor.editorState.getCurrentContent().getEntity(editor.resizeImageEntityKey)
        : null;

    const handleSubmitImage = ({ imageURL, imageWidth, imageHeight }) => {
        if (imageURL === '') return;
        setIsUrlDialogOpened(false);
        setIsUploadDialogOpened(false);

        const contentState = editor.editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(entities.IMAGE, 'IMMUTABLE', {
            src: imageURL,
            width: imageWidth,
            height: imageHeight,
        });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.push(
            editor.editorState,
            contentStateWithEntity,
            'apply-entity'
        );
        editor.onChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
        editorFocus();
    };

    const handleResizeImage = (width, height) => {
        editor.hideResizeImageDialog();
        const contentState = editor.editorState.getCurrentContent();
        const newEditorState = EditorState.push(
            editor.editorState,
            contentState.mergeEntityData(editor.resizeImageEntityKey, { width, height }),
            'apply-entity'
        );
        editor.onChange(newEditorState);
        editorFocus();
    };

    return (
        <React.Fragment>
            <ButtonControl
                onClick={(ev) => setAnchorEl(ev.currentTarget)}
                text={editor.translate('controls.image.title')}
                aria-controls={menuId}
                aria-haspopup="true">
                <ImageIcon />
            </ButtonControl>

            <Popover
                id={menuId}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}>
                <List
                    component="nav"
                    aria-label={editor.translate('controls.image.labels.insertOptions')}>
                    <ListItem
                        button
                        onClick={() => {
                            setIsUploadDialogOpened(true);
                            setAnchorEl(null);
                        }}>
                        <ListItemIcon>
                            <PublishIcon />
                        </ListItemIcon>
                        <ListItemText primary={editor.translate('controls.image.actions.upload')} />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => {
                            setIsUrlDialogOpened(true);
                            setAnchorEl(null);
                        }}>
                        <ListItemIcon>
                            <LinkIcon />
                        </ListItemIcon>
                        <ListItemText primary={editor.translate('controls.image.actions.url')} />
                    </ListItem>
                </List>
            </Popover>

            <ByUrlDialog
                onSubmit={handleSubmitImage}
                onClose={() => setIsUrlDialogOpened(false)}
                open={isUrlDialogOpened}
            />

            <UploadDialog
                onSubmit={handleSubmitImage}
                onClose={() => setIsUploadDialogOpened(false)}
                open={isUploadDialogOpened}
                uploadCallback={uploadCallback}
            />

            <ResizeImageDialog
                open={editor.isResizeImageDialogVisible}
                onClose={() => editor.hideResizeImageDialog()}
                src={imageEntityToResize ? imageEntityToResize.getData().src : ''}
                originalWidth={imageEntityToResize ? imageEntityToResize.getData().width : 0}
                originalHeight={imageEntityToResize ? imageEntityToResize.getData().height : 0}
                onSave={handleResizeImage}
            />
        </React.Fragment>
    );
}

ImageControl.propTypes = {
    configuration: PropTypes.object.isRequired,
    defaultConfiguration: PropTypes.object.isRequired,
};

export default ImageControl;
