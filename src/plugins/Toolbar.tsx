// Build toolbar lexical plugin for the editor

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND, REDO_COMMAND, UNDO_COMMAND } from "lexical";
import { Bold, Italic, Redo, Underline, Undo } from "lucide-react";
import Divider from "../shared/Divider";

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

  const handleUndo = () => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  };

  const handleRedo = () => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  };

  return (
    <div className="flex gap-2 bg-gray-100 p-2 rounded-md shadow-md border border-gray-200">
      <button className="toolbar-button" title="Undo" onClick={handleUndo}>
        <Undo className="w-4 h-4" />
      </button>
      <button className="toolbar-button" title="Redo" onClick={handleRedo}>
        <Redo className="w-4 h-4" />
      </button>

      <Divider />

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
