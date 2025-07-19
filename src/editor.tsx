import { ListItemNode, ListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import Toolbar from "./plugins/Toolbar";
import "./styles.css";

interface KabulMarkEditorProps {
  value?: string;
  placeholder?: string;
  className?: string;
}

function KabulMarkEditor({
  value,
  placeholder = "Start writing your content...",
  className
}: KabulMarkEditorProps) {
  const initialConfig = {
    namespace: "KabulMarkEditor",
    nodes: [ListNode, ListItemNode],
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
  };

  return (
    <div className={`editor-container ${className}`}>
      <LexicalComposer initialConfig={initialConfig}>
        <Toolbar />
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
