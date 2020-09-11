export default {
    base: '/react-mui-draft-wysiwyg/',
    files: 'docs/**/*.mdx',
    ignore: [
        'readme.md',
        'changelog.md',
        'code_of_conduct.md',
        'contributing.md',
        'license.md',
        'README.md',
        'CHANGELOG.md',
        'CODE_OF_CONDUCT.md',
        'CONTRIBUTING.md',
        'LICENSE.md',
    ],
    menu: [
        'Introduction',
        {
            name: 'Configuration',
            menu: [
                'Default configuration',
                'lang',
                'translations',
                'draftEditor',
                'editor',
                'toolbar',
            ],
        },
        {
            name: 'Data conversion',
            menu: ['HTML'],
        },
        {
            name: 'Examples',
            menu: [
                'Basic with empty content',
                'Basic with content',
                'Save content',
                'Read only editor',
                'Display the content in your page',
            ],
        },
    ],
    editBranch: 'docs',
    themeConfig: {
        styles: {
            Container: {
                maxWidth: 1360,
            },
            code: {
                backgroundColor: '#cecece',
                borderRadius: 2,
            },
        },
    },
};
