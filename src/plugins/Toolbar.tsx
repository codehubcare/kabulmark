import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  ElementNode,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalNode,
  RangeSelection,
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

import { TOGGLE_LINK_COMMAND } from "@lexical/link";
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
  Link2,
  List,
  ListOrdered,
  Redo,
  Underline,
  Undo
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Divider from "../shared/Divider";
import km from "../shared/km";

export interface ToolbarConfig {
  showRedo?: boolean;
  showUndo?: boolean;
  showBold?: boolean;
  showItalic?: boolean;
  showUnderline?: boolean;
  showLink?: boolean;
  showAlignLeft?: boolean;
  showAlignCenter?: boolean;
  showAlignRight?: boolean;
  showAlignJustify?: boolean;
  showList?: boolean;
  showNumberedList?: boolean;
  showBulletList?: boolean;
  showHeadingSelect?: boolean;
  showDirectionButtons?: boolean;
}

interface ToolbarProps {
  toolbarConfig?: ToolbarConfig;
}

const Toolbar = ({ toolbarConfig }: ToolbarProps) => {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [activeAlignment, setActiveAlignment] = useState<string>("");
  const [activeDirection, setActiveDirection] = useState<"ltr" | "rtl" | null>(
    null
  );
  const [isInList, setIsInList] = useState<{
    ordered: boolean;
    unordered: boolean;
  }>({
    ordered: false,
    unordered: false
  });
  const [blockType, setBlockType] = useState<string>("paragraph");
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [currentLinkUrl, setCurrentLinkUrl] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
            const direction = element.getDirection() ?? null;
            setActiveDirection(direction);
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
            } else if ($isQuoteNode(blockElement)) {
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
            return $createHeadingNode(
              newType as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
            );
          }
          return $createParagraphNode();
        });
      }
    });
  };

  const setBlocksDirection = (
    selection: RangeSelection,
    dir: "ltr" | "rtl" | null
  ) => {
    const selectedNodes = selection.getNodes();
    const topLevelElements = new Set<ElementNode>();
    for (const node of selectedNodes) {
      const topLevel = node.getTopLevelElement();
      if (topLevel && $isElementNode(topLevel)) {
        topLevelElements.add(topLevel);
      }
    }
    for (const element of topLevelElements) {
      element.setDirection(dir);
    }
  };

  const handleLTR = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        setBlocksDirection(selection, activeDirection === "ltr" ? null : "ltr");
      }
    });
  };

  const handleRTL = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        setBlocksDirection(selection, activeDirection === "rtl" ? null : "rtl");
      }
    });
  };

  const handleLinkButton = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (!selection.isCollapsed() || isLinkActive) {
          setUrl(currentLinkUrl || "");
          setModalOpen(true);
        } else {
          console.warn("Please select some text or place cursor in a link.");
        }
      }
    });
  };

  const handleSubmit = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, url.trim() || null);
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [modalOpen]);

  const getButtonClass = (isActive: boolean) =>
    `toolbar-button ${isActive ? "active" : ""}`;

  const {
    showRedo,
    showUndo,
    showBold,
    showItalic,
    showUnderline,
    showLink,
    showAlignLeft,
    showAlignCenter,
    showAlignRight,
    showAlignJustify,
    showList,
    showNumberedList,
    showBulletList,
    showHeadingSelect,
    showDirectionButtons
  } = toolbarConfig || {};

  return (
    <div
      className={km(
        "editor-toolbar flex flex-wrap items-center gap-2 p-3 border-b border-editor-border bg-gray-50 flex-grow"
      )}
      role="toolbar"
      aria-label="Editor toolbar"
    >
      {showUndo && (
        <button
          className="toolbar-button"
          title="Undo (Ctrl+Z)"
          aria-label="Undo"
          onClick={handleUndo}
          type="button"
        >
          <Undo className={km("w-4 h-4")} />
        </button>
      )}
      {showRedo && (
        <button
          className="toolbar-button"
          title="Redo (Ctrl+Y)"
          aria-label="Redo"
          onClick={handleRedo}
          type="button"
        >
          <Redo className={km("w-4 h-4")} />
        </button>
      )}
      {(showUndo || showRedo) &&
        (showBold || showItalic || showUnderline || showLink) && <Divider />}
      {showBold && (
        <button
          className={getButtonClass(activeFormats.has("bold"))}
          title="Bold (Ctrl+B)"
          aria-label="Bold"
          onClick={handleBold}
          type="button"
        >
          <Bold className={km("w-4 h-4")} />
        </button>
      )}
      {showItalic && (
        <button
          className={getButtonClass(activeFormats.has("italic"))}
          title="Italic (Ctrl+I)"
          aria-label="Italic"
          onClick={handleItalic}
          type="button"
        >
          <Italic className={km("w-4 h-4")} />
        </button>
      )}
      {showUnderline && (
        <button
          className={getButtonClass(activeFormats.has("underline"))}
          title="Underline (Ctrl+U)"
          aria-label="Underline"
          onClick={handleUnderline}
          type="button"
        >
          <Underline className={km("w-4 h-4")} />
        </button>
      )}
      {showLink && (
        <button
          className={getButtonClass(isLinkActive)}
          title="Insert Link"
          aria-label="Insert link"
          onClick={handleLinkButton}
          type="button"
        >
          <Link2 className={km("w-4 h-4")} />
        </button>
      )}
      {(showBold || showItalic || showUnderline || showLink) &&
        (showAlignLeft ||
          showAlignCenter ||
          showAlignRight ||
          showAlignJustify ||
          showDirectionButtons) && <Divider />}
      {showAlignLeft && (
        <button
          className={getButtonClass(
            activeAlignment === "left" || activeAlignment === ""
          )}
          title="Align Left"
          aria-label="Align left"
          onClick={handleAlignLeft}
          type="button"
        >
          <AlignLeft className={km("w-4 h-4")} />
        </button>
      )}
      {showAlignCenter && (
        <button
          className={getButtonClass(activeAlignment === "center")}
          title="Align Center"
          aria-label="Align center"
          onClick={handleAlignCenter}
          type="button"
        >
          <AlignCenter className={km("w-4 h-4")} />
        </button>
      )}
      {showAlignRight && (
        <button
          className={getButtonClass(activeAlignment === "right")}
          title="Align Right"
          aria-label="Align right"
          onClick={handleAlignRight}
          type="button"
        >
          <AlignRight className={km("w-4 h-4")} />
        </button>
      )}
      {showAlignJustify && (
        <button
          className={getButtonClass(activeAlignment === "justify")}
          title="Align Justify"
          aria-label="Align justify"
          onClick={handleAlignJustify}
          type="button"
        >
          <AlignJustify className={km("w-4 h-4")} />
        </button>
      )}
      {showDirectionButtons && (
        <>
          <button
            className={getButtonClass(activeDirection === "ltr")}
            title="Left-to-right direction"
            aria-label="Set left-to-right direction"
            onClick={handleLTR}
            type="button"
          >
            <span className={km("text-xs font-bold")}>LTR</span>
          </button>
          <button
            className={getButtonClass(activeDirection === "rtl")}
            title="Right-to-left direction"
            aria-label="Set right-to-left direction"
            onClick={handleRTL}
            type="button"
          >
            <span className={km("text-xs font-bold")}>RTL</span>
          </button>
        </>
      )}
      {(showAlignLeft ||
        showAlignCenter ||
        showAlignRight ||
        showAlignJustify ||
        showDirectionButtons) &&
        (showBulletList || showNumberedList || showList) && <Divider />}
      {showBulletList && (
        <button
          className={getButtonClass(isInList.unordered)}
          title="Bullet List"
          aria-label="Bullet list"
          onClick={handleBulletList}
          type="button"
        >
          <List className={km("w-4 h-4")} />
        </button>
      )}
      {showNumberedList && (
        <button
          className={getButtonClass(isInList.ordered)}
          title="Numbered List"
          aria-label="Numbered list"
          onClick={handleNumberedList}
          type="button"
        >
          <ListOrdered className={km("w-4 h-4")} />
        </button>
      )}
      {(showBulletList || showNumberedList || showList) &&
        showHeadingSelect && <Divider />}
      {showHeadingSelect && (
        <select
          value={blockType}
          onChange={(e) => formatBlock(e.target.value)}
          className={km(
            "px-2 py-1 bg-white border border-gray-200 rounded-md text-sm"
          )}
          aria-label="Block type"
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
      )}
      {modalOpen && (
        <div
          className={km(
            "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          )}
        >
          <div className={km("bg-white p-4 rounded-md shadow-lg w-96")}>
            <h3 className={km("font-bold mb-2")}>
              {isLinkActive ? "Edit Link" : "Insert Link"}
            </h3>
            <input
              ref={inputRef}
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL (e.g., https://example.com)"
              className={km("border p-2 w-full mb-2 rounded")}
            />
            <div className={km("flex justify-end gap-2")}>
              {isLinkActive && (
                <button
                  onClick={() => {
                    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
                    setModalOpen(false);
                  }}
                  className={km("px-4 py-2 bg-red-500 text-white rounded")}
                >
                  Remove
                </button>
              )}
              <button
                onClick={() => setModalOpen(false)}
                className={km("px-4 py-2 bg-gray-200 rounded")}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className={km("px-4 py-2 bg-blue-500 text-white rounded")}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
