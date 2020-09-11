import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, RichUtils } from 'draft-js';
import EditorFactories from './utils/EditorFactories';
import EditorToolbar from './EditorToolbar';
import Paper from '@material-ui/core/Paper';
import { defaultConfig } from './types/config';
import Translator from './lang/Translator';
import { makeStyles } from '@material-ui/core/styles';
import toHTML from './conversion/toHTML';
import useEditor from './hooks/useEditor';
import useEditorFocus from './hooks/useEditorFocus';
import 'draft-js/dist/Draft.css';

export { toolbarControlTypes } from './types/editorToolbar';
export { LANG_PREFIX } from './types/lang';
export { fileToBase64 } from './utils/fileUtils';
export { toHTML, useEditor, useEditorFocus };

export const EditorContext = React.createContext({});

export const MUIEditorState = {
    createEmpty: (config) => {
        const editorFactories = new EditorFactories(config);
        return EditorState.createEmpty(editorFactories.getCompositeDecorator());
    },
    createWithContent: (config, contentState) => {
        const editorFactories = new EditorFactories(config);
        return EditorState.createWithContent(contentState, editorFactories.getCompositeDecorator());
    },
};

const useStyles = makeStyles((theme) => ({
    '@global': {
        '.mui-editor-left-aligned-block': {
            textAlign: 'left !important',
            '& > div': {
                textAlign: 'left !important',
            },
        },
        '.mui-editor-center-aligned-block': {
            textAlign: 'center !important',
            '& > div': {
                textAlign: 'center !important',
            },
        },
        '.mui-editor-right-aligned-block': {
            textAlign: 'right !important',
            '& > div': {
                textAlign: 'right !important',
            },
        },
        '.mui-editor-justify-aligned-block': {
            textAlign: 'justify !important',
            '& > div': {
                textAlign: 'justify !important',
            },
        },
    },
    editorWrapper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(5),
    },
}));

/**
 * Material UI Draft.js editor
 *
 * @version 1.0.3
 * @author [Rubén Albarracín](https://github.com/Kelsier90)
 */
function MUIEditor({
    editorState,
    onChange,
    onFocus = null,
    onBlur = null,
    config = defaultConfig,
}) {
    const editorFactories = new EditorFactories(config);
    const editorRef = React.useRef(null);
    const translateRef = React.useRef(function () {});
    const translationsRef = React.useRef(null);
    const toolbarVisibleConfig = editorFactories.getConfigItem('toolbar', 'visible');
    const [isToolbarVisible, setIsToolbarVisible] = React.useState(toolbarVisibleConfig);
    const [isResizeImageDialogVisible, setIsResizeImageDialogVisible] = React.useState(false);
    const [resizeImageEntityKey, setResizeImageEntityKey] = React.useState(null);

    translationsRef.current = editorFactories.getTranslations();
    translateRef.current = React.useCallback((id) => {
        const translator = new Translator(translationsRef.current);
        return translator.get(id);
    }, []);
    const classes = useStyles();

    React.useEffect(() => {
        setIsToolbarVisible(toolbarVisibleConfig);
    }, [toolbarVisibleConfig]);

    const toolbar = (
        <EditorToolbar
            visible={isToolbarVisible}
            style={editorFactories.getConfigItem('toolbar', 'style')}
            className={editorFactories.getConfigItem('toolbar', 'className')}>
            {editorFactories.getToolbarControlComponents()}
        </EditorToolbar>
    );

    const top = editorFactories.getToolbarPosition() === 'top' ? toolbar : null;
    const bottom = editorFactories.getToolbarPosition() === 'bottom' ? toolbar : null;

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const handleFocus = (ev) => {
        if (onFocus) onFocus(ev);
    };

    const handleBlur = (ev) => {
        if (onBlur) onBlur(ev);
    };

    const editorWrapperProps = {
        style: editorFactories.getConfigItem('editor', 'style'),
        className: `${classes.editorWrapper} ${editorFactories.getConfigItem(
            'editor',
            'className'
        )}`,
        onClick: () => editorRef.current.focus(),
    };

    const editorWrapperElement = editorFactories.getConfigItem('editor', 'wrapperElement');

    if (editorWrapperElement === Paper) {
        editorWrapperProps.elevation = 3;
    }

    const EditorWrapper = React.createElement(
        editorWrapperElement,
        editorWrapperProps,
        <Editor
            {...editorFactories.getConfigItem('draftEditor')}
            ref={editorRef}
            editorState={editorState}
            onChange={onChange}
            onFocus={(ev) => handleFocus(ev)}
            onBlur={(ev) => handleBlur(ev)}
            handleKeyCommand={handleKeyCommand}
            blockStyleFn={editorFactories.getBlockStyleFn()}
            customStyleMap={editorFactories.getCustomStyleMap()}
            blockRenderMap={editorFactories.getBlockRenderMap()}
            blockRendererFn={editorFactories.getBlockRendererFn()}
        />
    );

    return (
        <EditorContext.Provider
            value={{
                editorState,
                onChange,
                ref: editorRef.current,
                translate: translateRef.current,
                showResizeImageDialog: (entityKey) => {
                    setIsResizeImageDialogVisible(true);
                    setResizeImageEntityKey(entityKey);
                },
                hideResizeImageDialog: () => {
                    setIsResizeImageDialogVisible(false);
                    setResizeImageEntityKey(null);
                },
                isResizeImageDialogVisible,
                resizeImageEntityKey,
            }}>
            {top}
            {EditorWrapper}
            {bottom}
        </EditorContext.Provider>
    );
}

MUIEditor.displayName = 'MUIEditor';

MUIEditor.propTypes = {
    /** Immutable object that represents the entire state of the editor */
    editorState: PropTypes.object.isRequired,
    /** The function to be executed by the Editor when edits and selection changes occur. The new editor state is passed by parameter. */
    onChange: PropTypes.func.isRequired,
    /** The function to be executed by the Editor when a focus event is triggered. The new editor state is passed by parameter. */
    onFocus: PropTypes.func,
    /** The function to be executed by the Editor when a blur event is triggered. The new editor state is passed by parameter. */
    onBlur: PropTypes.func,
    /** All the editor configuration options */
    config: PropTypes.object,
};

MUIEditor.defaultProps = {
    config: defaultConfig,
};

export default MUIEditor;
