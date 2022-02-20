const textAlignPlugin = () => ({
    blockStyleFn: (block) => {
        const textAlign = block.getData() ? block.getData().get('textAlign') : null;
        if (textAlign) {
            return `mui-editor-${textAlign}-aligned-block`;
        }

        return '';
    },
});

export default textAlignPlugin;
