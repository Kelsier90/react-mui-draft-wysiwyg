import inlineStyles from '../../../types/inlineStyles';

const fontColorPlugin = (configuration, defaultConfiguration) => {
    const fontColors = configuration.options || defaultConfiguration.options;
    const customStyleMap = {};
    for (const fontColor of fontColors) {
        customStyleMap[`${inlineStyles.FONT_COLOR}-${fontColor.value}`] = {
            color: fontColor.value,
        };
    }
    return { customStyleMap };
};

export default fontColorPlugin;
