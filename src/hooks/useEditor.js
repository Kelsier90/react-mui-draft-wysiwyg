import React from 'react';
import { EditorContext } from '../index';

export default function useEditor() {
    return React.useContext(EditorContext);
}
