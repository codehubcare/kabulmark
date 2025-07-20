import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import HtmlOutput from "./plugins/HtmlOutput";
import Toolbar from "./plugins/Toolbar";
import "./styles.css";

interface KabulMarkEditorProps {
  value?: string;
  placeholder?: string;
  className?: string;
  showHtmlOutput?: boolean;
  height?: string;
  showToolbar?: boolean;
}

function KabulMarkEditor({
  value,
  placeholder = "Start writing your content...",
  className,
  showHtmlOutput = false,
  showToolbar = true,
  height = "300px"
}: KabulMarkEditorProps) {
  const initialConfig = {
    namespace: "KabulMarkEditor",
    nodes: [ListNode, ListItemNode, LinkNode, HeadingNode, QuoteNode],
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
        h3: "text-xl font-bold mb-2",
        h4: "text-lg font-bold mb-2",
        h5: "text-base font-bold mb-2",
        h6: "text-sm font-bold mb-2"
      },
      quote: "border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-2",
      list: {
        ul: "list-disc ml-6 space-y-1",
        ol: "list-decimal ml-6 space-y-1",
        listitem: "pl-2",
        nested: {
          list: "ml-6 space-y-1",
          listitem: "pl-2"
        }
      }
    },
    onError: (error: Error) => {
      console.error(error);
    }
  };

  return (
    <div className={`editor-container ${className}`}>
      <LexicalComposer initialConfig={initialConfig}>
        {showToolbar && <Toolbar />}
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="editor-content font-editor text-editor-text"
              style={{ height: height, overflowY: "auto" }}
            />
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
