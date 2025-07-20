import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";

/**
 * This plugin is used to generate HTML from the editor content.
 * It is used or the debugging purpose.
 */
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
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg h-[300px] overflow-y-auto shadow-inner">
      <pre
        className="text-sm text-gray-100 whitespace-pre-wrap font-mono leading-relaxed"
        dir="ltr"
      >
        <code className="language-html">{htmlContent}</code>
      </pre>
    </div>
  );
};

export default HtmlOutput;
