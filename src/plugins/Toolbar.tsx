import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  ElementNode,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalNode,
  REDO_COMMAND,
  UNDO_COMMAND
} from "lexical";

import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode
} from "@lexical/rich-text";

import { $createParagraphNode } from "lexical";

import {
  $isListItemNode,
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND
} from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Redo,
  Underline,
  Undo
} from "lucide-react";
import { useEffect, useState } from "react";
import Divider from "../shared/Divider";

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [activeAlignment, setActiveAlignment] = useState<string>("");
  const [isInList, setIsInList] = useState<{
    ordered: boolean;
    unordered: boolean;
  }>({
    ordered: false,
    unordered: false
  });
  const [blockType, setBlockType] = useState<string>("paragraph");

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          // Track text formatting
          const formats = new Set<string>();
          if (selection.hasFormat("bold")) formats.add("bold");
          if (selection.hasFormat("italic")) formats.add("italic");
          if (selection.hasFormat("underline")) formats.add("underline");
          setActiveFormats(formats);

          // Track element alignment
          const element = selection.getNodes()[0]?.getTopLevelElement();
          if (element && $isElementNode(element)) {
            const formatType = element.getFormatType();
            setActiveAlignment(formatType);
          }

          // Track list state
          const anchorNode = selection.anchor.getNode();
          let listNode: ListNode | null = null;
          let currentNode: LexicalNode | null = anchorNode;

          while (currentNode && !listNode) {
            if ($isListNode(currentNode)) {
              listNode = currentNode;
            } else if ($isListItemNode(currentNode)) {
              const parent: ElementNode | null = currentNode.getParent();
              if ($isListNode(parent)) {
                listNode = parent;
              } else {
                currentNode = parent;
              }
            } else {
              currentNode = currentNode.getParent();
            }
          }

          setIsInList({
            ordered: listNode ? listNode.getListType() === "number" : false,
            unordered: listNode ? listNode.getListType() === "bullet" : false
          });
          // Track block type
          const blockElement = anchorNode.getTopLevelElement();
          let newBlockType = "paragraph";
          if (blockElement && $isElementNode(blockElement)) {
            if ($isHeadingNode(blockElement)) {
              newBlockType = blockElement.getTag();
            } else if ($isQuoteNode(element)) {
              newBlockType = "quote";
            }
          }
          setBlockType(newBlockType);
        }
      });
    });
  }, [editor]);

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

  const handleBulletList = () => {
    if (isInList.unordered) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
  };

  const handleNumberedList = () => {
    if (isInList.ordered) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  const formatBlock = (newType: string) => {
    if (newType === blockType) return;
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => {
          if (newType === "quote") {
            return $createQuoteNode();
          }
          if (newType.startsWith("h")) {
            return $createHeadingNode(newType);
          }
          return $createParagraphNode();
        });
      }
    });
  };

  const getButtonClass = (isActive: boolean) => {
    return `toolbar-button ${
      isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
    }`;
  };

  return (
    <div className="flex gap-2 bg-gray-100 p-2 rounded-md shadow-md border border-gray-200">
      <button
        className="toolbar-button hover:bg-gray-200"
        title="Undo (Ctrl+Z)"
        onClick={handleUndo}
      >
        <Undo className="w-4 h-4" />
      </button>
      <button
        className="toolbar-button hover:bg-gray-200"
        title="Redo (Ctrl+Y)"
        onClick={handleRedo}
      >
        <Redo className="w-4 h-4" />
      </button>

      <Divider />

      <button
        className={getButtonClass(activeFormats.has("bold"))}
        title="Bold (Ctrl+B)"
        onClick={handleBold}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(activeFormats.has("italic"))}
        title="Italic (Ctrl+I)"
        onClick={handleItalic}
      >
        <Italic className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(activeFormats.has("underline"))}
        title="Underline (Ctrl+U)"
        onClick={handleUnderline}
      >
        <Underline className="w-4 h-4" />
      </button>

      <Divider />

      {/* Text alignment buttons */}
      <button
        className={getButtonClass(
          activeAlignment === "left" || activeAlignment === ""
        )}
        title="Align Left"
        onClick={handleAlignLeft}
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(activeAlignment === "center")}
        title="Align Center"
        onClick={handleAlignCenter}
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(activeAlignment === "right")}
        title="Align Right"
        onClick={handleAlignRight}
      >
        <AlignRight className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(activeAlignment === "justify")}
        title="Align Justify"
        onClick={handleAlignJustify}
      >
        <AlignJustify className="w-4 h-4" />
      </button>

      <Divider />

      {/* List buttons */}
      <button
        className={getButtonClass(isInList.unordered)}
        title="Bullet List"
        onClick={handleBulletList}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        className={getButtonClass(isInList.ordered)}
        title="Numbered List"
        onClick={handleNumberedList}
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <Divider />

      <select
        value={blockType}
        onChange={(e) => formatBlock(e.target.value)}
        className="px-2 py-1 bg-white border border-gray-200 rounded-md text-sm"
      >
        <option value="paragraph">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
        <option value="h5">Heading 5</option>
        <option value="h6">Heading 6</option>
        <option value="quote">Blockquote</option>
      </select>
    </div>
  );
};

export default Toolbar;
