// Build toolbar lexical plugin for the editor

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND
} from "lexical";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Redo,
  Underline,
  Undo
} from "lucide-react";
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

  const handleAlignLeft = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
  };

  const handleAlignCenter = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
  };

  const handleAlignRight = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
  };

  const handleAlignJustify = () => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
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

      <Divider />

      {/* Text alignment buttons */}
      <button
        className="toolbar-button"
        title="Align Left"
        onClick={handleAlignLeft}
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        className="toolbar-button"
        title="Align Center"
        onClick={handleAlignCenter}
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        className="toolbar-button"
        title="Align Right"
        onClick={handleAlignRight}
      >
        <AlignRight className="w-4 h-4" />
      </button>
      <button
        className="toolbar-button"
        title="Align Justify"
        onClick={handleAlignJustify}
      >
        <AlignJustify className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toolbar;
