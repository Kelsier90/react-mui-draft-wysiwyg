import inlineStyles from '../../../types/inlineStyles';

const fontFamilyPlugin = (configuration, defaultConfiguration) => {
    const fontFamilies = configuration.options || defaultConfiguration.options;
    const customStyleMap = {};
    for (const fontFamily of fontFamilies) {
        customStyleMap[`${inlineStyles.FONT_FAMILY}-${fontFamily}`] =
            fontFamily === 'default'
                ? {}
                : {
                      fontFamily,
                  };
    }
    return { customStyleMap };
};

export default fontFamilyPlugin;
