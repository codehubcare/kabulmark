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
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg h-[300px] overflow-y-auto shadow-inner">
      <pre
        className="text-sm text-gray-100 whitespace-pre-wrap font-mono leading-relaxed"
        dir="ltr"
      >
        <code
          className="language-html"
          dangerouslySetInnerHTML={{
            __html: htmlContent
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(
                /&lt;(\/?[a-zA-Z][^&gt;]*)&gt;/g,
                '<span class="text-blue-400">&lt;$1&gt;</span>'
              )
              .replace(/(\w+)=/g, '<span class="text-green-400">$1</span>=')
              .replace(
                /"([^"]*)"/g,
                '"<span class="text-yellow-300">$1</span>"'
              )
              .replace(
                /&lt;!--([^-]*)--&gt;/g,
                '<span class="text-gray-500">&lt;!--$1--&gt;</span>'
              )
          }}
        />
      </pre>
    </div>
  );
};

export default HtmlOutput;
