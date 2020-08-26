import inlineStyles from '../../../types/inlineStyles';

const fontSizePlugin = (configuration, defaultConfiguration) => {
    const fontSizes = configuration.options || defaultConfiguration.options;
    const customStyleMap = {};
    for (const fontSize of fontSizes) {
        customStyleMap[`${inlineStyles.FONT_SIZE}-${fontSize}`] =
            fontSize === 'default' ? {} : { fontSize };
    }
    return { customStyleMap };
};

export default fontSizePlugin;
