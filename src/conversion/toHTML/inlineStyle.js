import inlineStyles from '../../types/inlineStyles';

const isInlineStyleCollection = (inlineStyle, style) =>
    inlineStyle.substr(0, style.length) === style;
const getInlineStyleCollectionValue = (inlineStyle, style) => inlineStyle.substr(style.length + 1);
export const getInlineStylesCss = (inlineStyle) => {
    switch (inlineStyle) {
        case inlineStyles.BOLD:
            return 'font-weight: bold;';
        case inlineStyles.ITALIC:
            return 'font-style: italic;';
        case inlineStyles.UNDERLINE:
            return 'text-decoration: underline;';
        case inlineStyles.STRIKETHROUGH:
            return 'text-decoration: line-through;';
        case inlineStyles.CODE:
            return 'font-family: monospace;';
        default:
            if (isInlineStyleCollection(inlineStyle, inlineStyles.FONT_FAMILY)) {
                return `font-family: '${getInlineStyleCollectionValue(
                    inlineStyle,
                    inlineStyles.FONT_FAMILY
                )}';`;
            }

            if (isInlineStyleCollection(inlineStyle, inlineStyles.FONT_SIZE)) {
                return `font-size: ${getInlineStyleCollectionValue(
                    inlineStyle,
                    inlineStyles.FONT_SIZE
                )};`;
            }

            if (isInlineStyleCollection(inlineStyle, inlineStyles.FONT_COLOR)) {
                return `color: ${getInlineStyleCollectionValue(
                    inlineStyle,
                    inlineStyles.FONT_COLOR
                )};`;
            }

            if (isInlineStyleCollection(inlineStyle, inlineStyles.FONT_BACKGROUND)) {
                return `background-color: ${getInlineStyleCollectionValue(
                    inlineStyle,
                    inlineStyles.FONT_BACKGROUND
                )};`;
            }

            return '';
    }
};
