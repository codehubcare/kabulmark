import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { Bold, Italic, Underline } from "lucide-react";
import "./styles.css";

interface KabulMarkEditorProps {
  value?: string;
  placeholder?: string;
}

function KabulMarkEditor({
  value,
  placeholder = "Start writing your content..."
}: KabulMarkEditorProps) {
  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <button className="toolbar-button" title="Bold">
          <Bold className="w-4 h-4" />
        </button>
        <button className="toolbar-button" title="Italic">
          <Italic className="w-4 h-4" />
        </button>
        <button className="toolbar-button" title="Underline">
          <Underline className="w-4 h-4" />
        </button>
      </div>
      <LexicalComposer
        initialConfig={{
          namespace: "KabulMarkEditor",
          theme: {
            text: {
              bold: "font-bold",
              italic: "italic",
              underline: "underline"
            },
            paragraph: "mb-2",
            heading: {
              h1: "text-3xl font-bold mb-4",
              h2: "text-2xl font-bold mb-3",
              h3: "text-xl font-bold mb-2"
            }
          },
          onError: (error: Error) => {
            console.error(error);
          }
        }}
      >
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="editor-content font-editor text-editor-text" />
          }
          placeholder={
            <div className="editor-placeholder absolute top-4 left-4">
              {placeholder}
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
      </LexicalComposer>
    </div>
  );
}

export default KabulMarkEditor;
export { KabulMarkEditor };
