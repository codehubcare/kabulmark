import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import EditorContent from "./plugins/EditorContent";
import HtmlOutput from "./plugins/HtmlOutput";
import InitialContentPlugin from "./plugins/InitialContent";
import OnChangePlugin from "./plugins/OnChangePlugin";
import Toolbar, { ToolbarConfig } from "./plugins/Toolbar";
import "./styles.css";
import { CodeNode } from "@lexical/code";

interface KabulMarkEditorProps {
  id?: string;
  error?: string;
  value?: string;
  placeholder?: string;
  className?: string;
  showHtmlOutput?: boolean;
  height?: string;
  showToolbar?: boolean;
  onChange?: (html: string) => void;
  toolbarConfig?: ToolbarConfig;
}

const defaultToolbarConfig: ToolbarConfig = {
  showRedo: false,
  showUndo: false,
  showBold: true,
  showItalic: true,
  showUnderline: true,
  showLink: false,
  showAlignLeft: true,
  showAlignCenter: true,
  showAlignRight: true,
  showAlignJustify: true,
  showList: true,
  showNumberedList: true,
  showBulletList: true,
  showHeadingSelect: true,
  showDirectionButtons: false
};

function KabulMarkEditor({
  id,
  error,
  value,
  placeholder = "Start writing your content...",
  className,
  showHtmlOutput = false,
  showToolbar = true,
  height = "300px",
  onChange,
  toolbarConfig = defaultToolbarConfig
}: KabulMarkEditorProps) {
  const initialConfig = {
    namespace: "KabulMarkEditor",
    nodes: [ListNode, ListItemNode, LinkNode, HeadingNode, QuoteNode, CodeNode],
    theme: {
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline"
      },
      link: "text-blue-600 underline",
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
      },
      rtl: "text-right",
      ltr: "text-left"
    },
    onError: (error: Error) => {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className={`editor-container ${className}`}
        role="application"
        aria-label="KabulMark rich text editor"
        id={id}
      >
        <LexicalComposer initialConfig={initialConfig}>
          {showToolbar && <Toolbar toolbarConfig={toolbarConfig} />}
          <EditorContent placeholder={placeholder} height={height} />
          <InitialContentPlugin initialHtml={value} />
          {showHtmlOutput && <HtmlOutput />}
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </LexicalComposer>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </>
  );
}

export default KabulMarkEditor;
export { KabulMarkEditor };
