import React from 'react';
import PropTypes from 'prop-types';
import entities from '../../../types/entities';
import blockStyles from '../../../types/blockStyles';
import { EditorState, Modifier, SelectionState } from 'draft-js';
import useEditor from '../../../hooks/useEditor';
import useEditorFocus from '../../../hooks/useEditorFocus';
import Popover from '@material-ui/core/Popover';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ImageIcon from '@material-ui/icons/Image';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PhotoSizeSelectLargeIcon from '@material-ui/icons/PhotoSizeSelectLarge';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const EditorMedia = ({ contentState, block }) => {
    const entity = contentState.getEntity(block.getEntityAt(0));
    const type = entity.getType();

    if (type === entities.IMAGE) {
        const { src, width = 'auto', height = 'auto' } = entity.getData();
        return (
            <EditorImage
                src={src}
                width={width}
                height={height}
                block={block}
                contentState={contentState}
            />
        );
    }

    return null;
};

EditorMedia.propTypes = {
    contentState: PropTypes.object.isRequired,
    block: PropTypes.object.isRequired,
};

const useStyles = makeStyles((theme) => ({
    imgInfo: {
        padding: theme.spacing(0.6),
    },
}));

const EditorImage = ({ src, width, height, contentState, block }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [infoAnchorEl, setInfoAnchorEl] = React.useState(null);
    const editor = useEditor();
    const editorFocus = useEditorFocus();
    const classes = useStyles();

    const showOptions = (ev) => {
        setAnchorEl(ev.currentTarget);
        setInfoAnchorEl(ev.currentTarget);
    };

    const hideOptions = () => {
        setAnchorEl(null);
        setInfoAnchorEl(null);
    };

    const imageAlign = (ev, align) => {
        ev.preventDefault();
        ev.stopPropagation();
        const imageSelection = SelectionState.createEmpty(block.getKey()).merge({
            anchorKey: block.getKey(),
            anchorOffset: 0,
            focusKey: block.getKey(),
            focusOffset: block.getLength(),
        });

        const newContentState = Modifier.setBlockData(contentState, imageSelection, {
            textAlign: align,
        });
        editor.onChange(EditorState.push(editor.editorState, newContentState, 'change-block-data'));
        editorFocus();
    };

    const removeImage = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const imageSelection = SelectionState.createEmpty(block.getKey()).merge({
            anchorKey: block.getKey(),
            anchorOffset: 0,
            focusKey: block.getKey(),
            focusOffset: block.getLength(),
        });

        let newContentState = Modifier.removeRange(contentState, imageSelection, 'forward');

        const blockMap = newContentState.getBlockMap().delete(block.getKey());

        const firstBlock = newContentState.getFirstBlock();

        const selectionToStart = SelectionState.createEmpty(firstBlock.getKey()).merge({
            anchorKey: firstBlock.getKey(),
            anchorOffset: 0,
            focusKey: firstBlock.getKey(),
            focusOffset: 0,
        });

        newContentState = newContentState.merge({ blockMap, selectionAfter: selectionToStart });

        editor.onChange(EditorState.push(editor.editorState, newContentState, 'remove-range'));
        editorFocus();
    };

    if (!src) return null;

    return (
        <React.Fragment>
            <img alt={src} src={src} width={width} height={height} onClick={showOptions} />
            <Popover
                open={Boolean(infoAnchorEl)}
                onClose={hideOptions}
                anchorEl={infoAnchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}>
                <Typography color="textSecondary" variant="body1" className={classes.imgInfo}>
                    {width}&nbsp;x&nbsp;{height}
                </Typography>
            </Popover>
            <Popover
                open={Boolean(anchorEl)}
                onClose={hideOptions}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <ButtonGroup
                    size="small"
                    aria-label={editor.translate('controls.image.labels.editOptions')}>
                    <Button
                        onClick={(ev) => imageAlign(ev, 'left')}
                        title={editor.translate('controls.image.actions.alignLeft')}>
                        <ArrowLeftIcon />
                        <ImageIcon />
                    </Button>
                    <Button
                        onClick={(ev) => imageAlign(ev, 'center')}
                        title={editor.translate('controls.image.actions.alignCenter')}>
                        <ArrowLeftIcon />
                        <ImageIcon />
                        <ArrowRightIcon />
                    </Button>
                    <Button
                        onClick={(ev) => imageAlign(ev, 'right')}
                        title={editor.translate('controls.image.actions.alignRight')}>
                        <ImageIcon />
                        <ArrowRightIcon />
                    </Button>
                    <Button
                        onClick={() => {
                            hideOptions();
                            editor.showResizeImageDialog(block.getEntityAt(0));
                        }}
                        title={editor.translate('controls.image.actions.resize')}>
                        <PhotoSizeSelectLargeIcon />
                    </Button>
                    <Button
                        onClick={removeImage}
                        title={editor.translate('controls.image.actions.remove')}>
                        <DeleteIcon />
                    </Button>
                </ButtonGroup>
            </Popover>
        </React.Fragment>
    );
};

EditorImage.propTypes = {
    src: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    contentState: PropTypes.object.isRequired,
    block: PropTypes.object.isRequired,
};

const imagePlugin = () => ({
    blockRendererFn: (block) => {
        if (block.getType() === blockStyles.ATOMIC) {
            return {
                component: EditorMedia,
                editable: false,
            };
        }
    },
});

export default imagePlugin;
