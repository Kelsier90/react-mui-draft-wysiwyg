import { blockHTMLMap } from './block';
import { entityHTMLMap } from './entity';
import { getInlineStylesCss } from './inlineStyle';
import blockStyles from '../../types/blockStyles';

const toHTML = (contentState) => {
    let html = '';
    let isListBlock = false;
    const blockMap = contentState.getBlockMap();
    let blockCount = 0;
    for (const blockData of blockMap) {
        const block = blockData[1];
        // Block tags
        const blockTag = blockHTMLMap[block.getType()];
        const blockStyle = block.getData().has('textAlign')
            ? `text-align:${block.getData().get('textAlign')};`
            : null;
        let blockOpenTag = blockTag
            ? `<${blockTag}${blockStyle ? ` style="${blockStyle}"` : ''}>`
            : '';
        let blockCloseTag = blockTag ? `</${blockTag}>` : '';

        if (block.getType() === blockStyles.UL || block.getType() === blockStyles.OL) {
            if (!isListBlock) {
                blockOpenTag = `${
                    block.getType() === blockStyles.UL ? '<ul>' : '<ol>'
                }${blockOpenTag}`;
            }
            // if is the last block closes the list
            if (blockCount === blockMap.length - 1) {
                blockCloseTag = `${blockCloseTag}${
                    block.getType() === blockStyles.UL ? '</ul>' : '</ol>'
                }`;
            }
            isListBlock = true;
        } else {
            // Closes the previous opened list
            if (isListBlock) {
                blockOpenTag = `${
                    block.getType() === blockStyles.UL ? '</ul>' : '</ol>'
                }${blockOpenTag}`;
            }
            isListBlock = false;
        }

        if (block.getLength() === 0) {
            html += blockOpenTag + blockCloseTag;
            continue;
        }

        html += blockOpenTag;
        let lastEntityKey = null;
        const currentOpenedStylesMap = {};
        for (const charIndex in block.getText()) {
            const isLastChar = parseInt(charIndex) === block.getLength() - 1;
            // Entities
            let entityOpenTag = '';
            let entityCloseTag = '';
            const currentEntityKey = block.getEntityAt(charIndex);
            if (currentEntityKey !== lastEntityKey) {
                if (lastEntityKey === null) {
                    const entity = contentState.getEntity(currentEntityKey);
                    entityOpenTag = entityHTMLMap[entity.getType()](entity)[0];
                } else if (currentEntityKey === null) {
                    const entity = contentState.getEntity(lastEntityKey);
                    entityCloseTag = entityHTMLMap[entity.getType()](entity)[1];
                } else {
                    const entityHaveToClose = contentState.getEntity(lastEntityKey);
                    const entityHaveToOpen = contentState.getEntity(currentEntityKey);
                    entityOpenTag =
                        entityHTMLMap[entityHaveToClose.getType()](entityHaveToClose)[0] +
                        entityHTMLMap[entityHaveToOpen.getType()](entityHaveToOpen)[1];
                }
            } else if (currentEntityKey !== null && isLastChar) {
                const entity = contentState.getEntity(currentEntityKey);
                entityCloseTag = entityHTMLMap[entity.getType()](entity)[1];
            }

            // Inline styles
            const charInlineStyles = block.getInlineStyleAt(charIndex);
            const styleCloseTagBeforeList = [];
            const styleOpenTagList = [];
            const styleCloseTagList = [];
            const styleCloseTagOpenIndexList = [];
            const styleCloseTagBeforeOpenIndexList = [];

            for (const inlineStyle of charInlineStyles) {
                if (currentOpenedStylesMap[inlineStyle] === undefined) {
                    styleOpenTagList.push(inlineStyle);
                    currentOpenedStylesMap[inlineStyle] = charIndex;
                } else if (entityOpenTag || entityCloseTag) {
                    styleCloseTagBeforeList.push(inlineStyle);
                    styleCloseTagBeforeOpenIndexList.push(currentOpenedStylesMap[inlineStyle]);
                    delete currentOpenedStylesMap[inlineStyle];
                } else if (isLastChar) {
                    styleCloseTagList.push(inlineStyle);
                    styleCloseTagOpenIndexList.push(currentOpenedStylesMap[inlineStyle]);
                    delete currentOpenedStylesMap[inlineStyle];
                }
            }

            for (const inlineStyle in currentOpenedStylesMap) {
                if (
                    !charInlineStyles.includes(inlineStyle) &&
                    !styleCloseTagList.includes(inlineStyle) &&
                    !styleCloseTagBeforeList.includes(inlineStyle)
                ) {
                    styleCloseTagBeforeList.push(inlineStyle);
                    styleCloseTagBeforeOpenIndexList.push(currentOpenedStylesMap[inlineStyle]);
                    delete currentOpenedStylesMap[inlineStyle];
                } else if (isLastChar) {
                    styleCloseTagList.push(inlineStyle);
                    styleCloseTagOpenIndexList.push(currentOpenedStylesMap[inlineStyle]);
                    delete currentOpenedStylesMap[inlineStyle];
                }
            }

            for (const closedIndex of styleCloseTagOpenIndexList) {
                for (const inlineStyle in currentOpenedStylesMap) {
                    if (currentOpenedStylesMap[inlineStyle] > closedIndex) {
                        styleCloseTagList.push(inlineStyle);
                        styleCloseTagOpenIndexList.push(currentOpenedStylesMap[inlineStyle]);
                        delete currentOpenedStylesMap[inlineStyle];
                    }
                }
            }

            for (const closedIndex of styleCloseTagBeforeOpenIndexList) {
                for (const inlineStyle in currentOpenedStylesMap) {
                    if (
                        currentOpenedStylesMap[inlineStyle] < charIndex &&
                        currentOpenedStylesMap[inlineStyle] > closedIndex
                    ) {
                        styleCloseTagBeforeList.push(inlineStyle);
                        styleCloseTagBeforeOpenIndexList.push(currentOpenedStylesMap[inlineStyle]);
                        delete currentOpenedStylesMap[inlineStyle];
                        if (charInlineStyles.includes(inlineStyle)) {
                            styleOpenTagList.push(inlineStyle);
                            currentOpenedStylesMap[inlineStyle] = charIndex;
                        }
                    }
                }
            }

            // HTML Build
            let j = 0;
            while (j < styleCloseTagBeforeList.length) {
                html += '</span>';
                j++;
            }
            html += entityOpenTag;
            for (const style of styleOpenTagList) {
                html += '<span style="' + getInlineStylesCss(style) + '">';
            }
            html += block.getText()[charIndex];
            let k = 0;
            while (k < styleCloseTagList.length) {
                html += '</span>';
                k++;
            }
            html += entityCloseTag;

            lastEntityKey = currentEntityKey;
        }
        html += blockCloseTag;
        blockCount++;
    }
    return html;
};

export default toHTML;
