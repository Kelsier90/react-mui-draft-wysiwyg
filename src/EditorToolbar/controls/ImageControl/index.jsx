import React from 'react';
import PropTypes from 'prop-types';
import useEditor from '../../../hooks/useEditor';
import useEditorFocus from '../../../hooks/useEditorFocus';
import ButtonControl from '../core/ButtonControl';
import ImageIcon from '@material-ui/icons/Image';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PublishIcon from '@material-ui/icons/Publish';
import LinkIcon from '@material-ui/icons/Link';
import entities from '../../../types/entities';
import { EditorState, AtomicBlockUtils } from 'draft-js';
import ByUrlDialog from './dialogs/ByURLDialog';
import UploadDialog from './dialogs/UploadDialog';

function ImageControl({ configuration, defaultConfiguration }) {
    const editor = useEditor();
    const editorFocus = useEditorFocus();
    const menuId = Math.random().toString(36).substring(8);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isUploadDialogOpened, setIsUploadDialogOpened] = React.useState(false);
    const [isUrlDialogOpened, setIsUrlDialogOpened] = React.useState(false);
    const uploadCallback = configuration.uploadCallback || defaultConfiguration.uploadCallback;

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
        </React.Fragment>
    );
}

ImageControl.propTypes = {
    configuration: PropTypes.object.isRequired,
    defaultConfiguration: PropTypes.object.isRequired,
};

export default ImageControl;
