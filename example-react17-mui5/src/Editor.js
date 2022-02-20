import React from "react";
import MUIEditor, { MUIEditorState } from "./react-mui17-draft-wysiwyg";

export default function Example() {
  const [editorState, setEditorState] = React.useState(
    MUIEditorState.createEmpty()
  );

  const onChange = (newState) => {
    setEditorState(newState);
  };

    return <MUIEditor editorState={editorState} onChange={onChange} />

}
