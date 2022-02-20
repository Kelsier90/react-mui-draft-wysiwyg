import { EditorState, Modifier, RichUtils } from 'draft-js';

export const toggleMappedInlineStyle = (editorState, styleKeys, newInlineStyle) => {
    const selection = editorState.getSelection();

    // Turn off the other mapped inline styled in selection
    const newContentState = styleKeys.reduce(
        (contentState, inlineStyle) =>
            Modifier.removeInlineStyle(contentState, selection, inlineStyle),
        editorState.getCurrentContent()
    );

    let newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');

    const currentStyle = editorState.getCurrentInlineStyle();

    if (selection.isCollapsed()) {
        newEditorState = currentStyle.reduce((state, inlineStyle) => {
            return RichUtils.toggleInlineStyle(state, inlineStyle);
        }, newEditorState);
    }
    // If the inline style is being toggled on, apply it.
    if (!currentStyle.has(newInlineStyle)) {
        newEditorState = RichUtils.toggleInlineStyle(newEditorState, newInlineStyle);
    }

    return newEditorState;
};

export const getCurrentMappedInlineStyle = (editorState, styleKeys, defaultInlineStyle = null) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return (
        currentStyle.find((inlineStyle) => styleKeys.includes(inlineStyle)) || defaultInlineStyle
    );
};

export const hasAllSelectionTheInlineStyle = (editorState, inlineStyle) => {
    const selection = editorState.getSelection();
    const startKey = selection.getStartKey();
    const startOffset = selection.getStartOffset();
    const endKey = selection.getEndKey();
    const endOffset = selection.getEndOffset();

    const currentContent = editorState.getCurrentContent();

    let block = currentContent.getBlockForKey(startKey);
    let allHasTheInlineStyle = true;

    const styleRangesCallback = (block) => (start, end) => {
        const expectedStart = block.getKey() === startKey ? startOffset : 0;
        const expectedEnd = block.getKey() === endKey ? endOffset : block.getLength() - 1;
        allHasTheInlineStyle = start <= expectedStart && end >= expectedEnd;
    };

    while (block && allHasTheInlineStyle) {
        allHasTheInlineStyle = false;
        block.findStyleRanges(
            (character) => character.hasStyle(inlineStyle),
            styleRangesCallback(block)
        );
        if (block.getKey() !== endKey) break;
        block = currentContent.getBlockAfter(block.getKey());
    }

    return allHasTheInlineStyle;
};

export const getCurrentBlockType = (editorState, availableBlockTypes) => {
    const blockType = RichUtils.getCurrentBlockType(editorState);
    if (availableBlockTypes.find((avBlockType) => avBlockType === blockType)) return blockType;
    return 'default';
};

export const applyEntityToCurrentSelection = (editorState, entityType, mutability, entityData) => {
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity(entityType, mutability, entityData);
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    const selection = editorState.getSelection();
    const contentStateWithEntity = Modifier.applyEntity(contentWithEntity, selection, entityKey);
    return EditorState.push(editorState, contentStateWithEntity, 'apply-entity');
};
