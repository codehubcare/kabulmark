import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import "./styles.css";

function KabulMarkEditor() {
  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <button className="toolbar-button" title="Bold">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 12h8a4 4 0 100-8H6v8zm0 0h8a4 4 0 110 8H6v-8z"
            />
          </svg>
        </button>
        <button className="toolbar-button" title="Italic">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </button>
        <button className="toolbar-button" title="Underline">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
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
              Start writing your content...
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
