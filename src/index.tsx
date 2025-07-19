import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

function KabulMarkEditor() {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "MyEditor",
        theme: {
          text: {
            bold: "font-bold"
          }
        },
        onError: (error: Error) => {
          console.error(error);
        }
      }}
    >
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
    </LexicalComposer>
  );
}

export { KabulMarkEditor };
export default KabulMarkEditor;
