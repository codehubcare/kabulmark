import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { $getRoot } from "lexical";
import { useEffect, useState } from "react";
import km from "../shared/km";

interface EditorContentProps {
  placeholder: string;
  height: string;
}

export default function EditorContent({
  placeholder,
  height
}: EditorContentProps) {
  const [editor] = useLexicalComposerContext();
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        setIsEmpty($getRoot().getChildrenSize() === 0);
      });
    });
    return unregister;
  }, [editor]);

  return (
    <div className={km("relative")}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className={km("editor-content font-editor text-editor-text")}
            style={{ height, overflowY: "auto" }}
            role="textbox"
            aria-multiline="true"
            aria-label="Rich text editing area"
          />
        }
        placeholder={null}
        ErrorBoundary={LexicalErrorBoundary}
      />
      {isEmpty && (
        <div className={km("editor-placeholder absolute top-4 left-4")}>
          {placeholder}
        </div>
      )}
    </div>
  );
}
