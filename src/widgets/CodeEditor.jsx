import React, { useRef} from "react";
import Editor from "@monaco-editor/react";

export function CodeEditor() {
    const editorRef = useRef(null);
    function onEditorMount(editor, monaco) {
      editorRef.current = editor; 
    }
    
    async function showValue(event) {
        event.preventDefault()
        console.log(editorRef.current.getValue())

    }
    const defaultCode = `def myFunc(a,b) : return a+b`

    return (
        <>
            <Editor
            height="25vh"
            defaultLanguage="python"
            defaultValue={defaultCode}
            onMount={onEditorMount}
            theme="vs-dark"
            />
            <button onClick={showValue} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Run</button>
        </>
    );

}