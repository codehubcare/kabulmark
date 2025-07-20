import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import HtmlOutput from "./plugins/HtmlOutput";
import Toolbar from "./plugins/Toolbar";
import "./styles.css";

interface KabulMarkEditorProps {
  value?: string;
  placeholder?: string;
  className?: string;
  showHtmlOutput?: boolean;
}

function KabulMarkEditor({
  value,
  placeholder = "Start writing your content...",
  className,
  showHtmlOutput = false
}: KabulMarkEditorProps) {
  const initialConfig = {
    namespace: "KabulMarkEditor",
    nodes: [ListNode, ListItemNode, LinkNode],
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
      },
      list: {
        ul: "list-disc",
        ol: "list-decimal"
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
        {showHtmlOutput && <HtmlOutput />}
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
      </LexicalComposer>
    </div>
  );
}

export default KabulMarkEditor;
export { KabulMarkEditor };
