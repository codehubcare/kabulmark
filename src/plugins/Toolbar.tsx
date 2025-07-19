// Build toolbar lexical plugin for the editor

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { Bold, Italic, Underline } from "lucide-react";

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();

  const handleBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  };

  const handleItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  };

  const handleUnderline = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
  };

  return (
    <div className="flex gap-2 bg-gray-100 p-2 rounded-md shadow-md border border-gray-200">
      <HistoryPlugin />
      <button className="toolbar-button" title="Bold" onClick={handleBold}>
        <Bold className="w-4 h-4" />
      </button>
      <button className="toolbar-button" title="Italic" onClick={handleItalic}>
        <Italic className="w-4 h-4" />
      </button>
      <button
        className="toolbar-button"
        title="Underline"
        onClick={handleUnderline}
      >
        <Underline className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toolbar;
