import {useRef} from "react"

import MonacoEditor,{EditorDidMount} from "@monaco-editor/react";
import prettier from 'prettier'
import parser from "prettier/parser-babel"
import "./code-editor.css"

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;

}


const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
   const eidtorRef=useRef<any>()

  const onEditorDidMount:EditorDidMount=(getValue,monacoEditor)=>{
    eidtorRef.current=monacoEditor  
monacoEditor.onDidChangeModelContent(()=>{
   onChange(getValue())
})

monacoEditor.getModel()?.updateOptions({tabSize:2})
  }

  const onFormatClick=()=>{
const unformatted=eidtorRef.current.getModel().getValue()
const formatted=prettier.format(unformatted,{parser:'babel',plugins:[parser],useTabs:false,semi:true,singleQuote:true}).replace(/\$/,'')
eidtorRef.current.setValue(formatted)
  }

    return (
        <div className="editor-wrapper">
            <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
    <MonacoEditor
      value={initialValue}
      editorDidMount={onEditorDidMount}
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      theme="dark"
      language="javascript"
      height="100%"
    />
    </div>
  );
};
export default CodeEditor;
