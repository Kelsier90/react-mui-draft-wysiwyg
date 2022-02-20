import inlineStyles from '../../../types/inlineStyles';

const fontBackgroundColorPlugin = (configuration, defaultConfiguration) => {
    const fontBgs = configuration.options || defaultConfiguration.options;
    const customStyleMap = {};
    for (const fontBg of fontBgs) {
        customStyleMap[`${inlineStyles.FONT_BACKGROUND}-${fontBg.value}`] = {
            backgroundColor: fontBg.value,
        };
    }
    return { customStyleMap };
};

export default fontBackgroundColorPlugin;
