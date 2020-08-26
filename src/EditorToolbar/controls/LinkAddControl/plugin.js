import React from 'react';
import PropTypes from 'prop-types';
import useEditor from '../../../hooks/useEditor';
import useEditorFocus from '../../../hooks/useEditorFocus';
import { RichUtils, SelectionState } from 'draft-js';
import Link from '@material-ui/core/Link';
import entities from '../../../types/entities';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import LaunchIcon from '@material-ui/icons/Launch';
import LinkOffIcon from '@material-ui/icons/LinkOff';

const linkStrategy = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === entities.LINK;
    }, callback);
};

const EditorLink = ({ contentState, entityKey, blockKey, start, end, children }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const editor = useEditor();
    const editorFocus = useEditorFocus();
    const { url } = contentState.getEntity(entityKey).getData();

    const showOptions = (ev) => {
        setAnchorEl(ev.currentTarget);
    };

    const hideOptions = () => {
        setAnchorEl(null);
    };

    const openLink = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        window.open(url, '_blank');
    };

    const removeLink = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        const linkSelection = SelectionState.createEmpty(blockKey).merge({
            anchorKey: blockKey,
            anchorOffset: start,
            focusKey: blockKey,
            focusOffset: end,
        });

        editor.onChange(RichUtils.toggleLink(editor.editorState, linkSelection, null));
        editorFocus();
    };

    return (
        <React.Fragment>
            <Link
                href={url}
                rel="noopener noreferrer"
                target="_blank"
                aria-label={url}
                onClick={showOptions}>
                {children}
            </Link>
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
                <ButtonGroup size="small" aria-label="Link options">
                    <Button onClick={openLink} title={`Open ${url}`}>
                        <LaunchIcon />
                    </Button>
                    <Button onClick={removeLink} title="Remove link">
                        <LinkOffIcon />
                    </Button>
                </ButtonGroup>
            </Popover>
        </React.Fragment>
    );
};

EditorLink.propTypes = {
    contentState: PropTypes.object.isRequired,
    entityKey: PropTypes.string.isRequired,
    blockKey: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    children: PropTypes.any,
};

const linkAddPlugin = () => ({
    decorators: [
        {
            strategy: linkStrategy,
            component: EditorLink,
        },
    ],
});

export default linkAddPlugin;
