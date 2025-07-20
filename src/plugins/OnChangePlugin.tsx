import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

type OnChangePluginProps = {
  onChange?: (html: string) => void;
};

function cleanHtml(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const elements = doc.querySelectorAll("*[class], *[style], *[dir]");
  elements.forEach((el) => {
    el.removeAttribute("class");
    el.removeAttribute("style");
    el.removeAttribute("dir");
  });
  return doc.body.innerHTML;
}

export default function OnChangePlugin({ onChange }: OnChangePluginProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!onChange) return;

    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor, null);
        const clean = cleanHtml(html);
        onChange(clean);
      });
    });
  }, [editor, onChange]);

  return null;
}
