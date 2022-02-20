import React from 'react';
import useEditor from './useEditor';

export default function useEditorFocus() {
    const editor = useEditor();
    const [changesCount, setChangesCount] = React.useState(0);

    React.useEffect(() => {
        if (changesCount > 0) editor.ref.focus();
    }, [changesCount, editor.ref]);

    return () => {
        setChangesCount((currentChangesCount) => currentChangesCount + 1);
    };
}
