import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";

const HtmlOutput = () => {
  const [editor] = useLexicalComposerContext();
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor, null);
        setHtmlContent(html);
      });
    });
  }, [editor]);

  return (
    <div className="border border-gray-300 p-2 rounded-md">
      <pre className="text-sm whitespace-pre-wrap" dir="ltr">
        {htmlContent}
      </pre>
    </div>
  );
};

export default HtmlOutput;
