import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { TRANSFORMERS } from "@lexical/markdown";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import EditorContent from "./plugins/EditorContent";
import HtmlOutput from "./plugins/HtmlOutput";
import InitialContentPlugin from "./plugins/InitialContent";
import OnChangePlugin from "./plugins/OnChangePlugin";
import Toolbar, { ToolbarConfig } from "./plugins/Toolbar";
import km from "./shared/km";
import "./styles.css";

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
        bold: km("font-bold"),
        italic: km("italic"),
        underline: km("underline")
      },
      link: km("text-blue-600 underline"),
      paragraph: km("mb-2"),
      heading: {
        h1: km("text-3xl font-bold mb-4"),
        h2: km("text-2xl font-bold mb-3"),
        h3: km("text-xl font-bold mb-2"),
        h4: km("text-lg font-bold mb-2"),
        h5: km("text-base font-bold mb-2"),
        h6: km("text-sm font-bold mb-2")
      },
      quote: km("border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-2"),
      list: {
        ul: km("list-disc ml-6 space-y-1"),
        ol: km("list-decimal ml-6 space-y-1"),
        listitem: km("pl-2"),
        nested: {
          list: km("ml-6 space-y-1"),
          listitem: km("pl-2")
        }
      },
      rtl: km("text-right"),
      ltr: km("text-left")
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
