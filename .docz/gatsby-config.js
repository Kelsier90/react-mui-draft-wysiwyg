const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/react-mui-draft-wysiwyg/',

  siteMetadata: {
    title: 'React Mui Draft Wysiwyg',
    description:
      'React component that allows to use a rich editor based on Material UI and Draft-js',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {
          styles: {
            Container: { maxWidth: 1360 },
            code: { backgroundColor: '#cecece', borderRadius: 2 },
          },
        },
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
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
          { name: 'Data conversion', menu: ['HTML'] },
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
        mdPlugins: [],
        hastPlugins: [],
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
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root:
          'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\.docz',
        base: '/react-mui-draft-wysiwyg/',
        source: './',
        'gatsby-root': null,
        files: 'docs/**/*.mdx',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'docs',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'React Mui Draft Wysiwyg',
        description:
          'React component that allows to use a rich editor based on Material UI and Draft-js',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg',
          templates:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\node_modules\\docz-core\\dist\\templates',
          docz:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\.docz',
          cache:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\.docz\\.cache',
          app:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\.docz\\app',
          appPackageJson:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\package.json',
          appTsConfig:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\tsconfig.json',
          gatsbyConfig:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\gatsby-config.js',
          gatsbyBrowser:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\gatsby-browser.js',
          gatsbyNode:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\gatsby-node.js',
          gatsbySSR:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\gatsby-ssr.js',
          importsJs:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\.docz\\app\\imports.js',
          rootJs:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\.docz\\app\\root.jsx',
          indexJs:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\.docz\\app\\index.jsx',
          indexHtml:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\.docz\\app\\index.html',
          db:
            'D:\\Documents\\React Projects\\components\\react-mui-draft-wysiwyg\\.docz\\app\\db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
