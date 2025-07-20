import { $createLinkNode } from "@lexical/link";
import { $createListItemNode, $createListNode } from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType
} from "@lexical/rich-text";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $isElementNode,
  ElementNode,
  LexicalEditor,
  LexicalNode,
  ParagraphNode
} from "lexical";
import { useEffect, useRef } from "react";

function generateNodesFromDOM(
  nodes: NodeList,
  editor: LexicalEditor,
  format: number = 0
): LexicalNode[] {
  const lexicalNodes: LexicalNode[] = [];
  for (const domNode of nodes) {
    if (domNode.nodeType === Node.TEXT_NODE) {
      const textNode = $createTextNode((domNode as Text).data || "");
      textNode.setFormat(format);
      lexicalNodes.push(textNode);
    } else if (domNode.nodeType === Node.ELEMENT_NODE) {
      const element = domNode as HTMLElement;
      const tag = element.tagName.toLowerCase();
      let newFormat = format;
      if (["strong", "b"].indexOf(tag) !== -1) newFormat |= 1; // bold
      if (["em", "i"].indexOf(tag) !== -1) newFormat |= 2; // italic
      if (["u"].indexOf(tag) !== -1) newFormat |= 8; // underline

      if (["strong", "b", "em", "i", "u", "span"].indexOf(tag) !== -1) {
        lexicalNodes.push(
          ...generateNodesFromDOM(element.childNodes, editor, newFormat)
        );
        continue;
      }

      if (tag === "a") {
        const linkNode = $createLinkNode(element.getAttribute("href") || "", {
          target: element.getAttribute("target") || null
        });
        linkNode.append(
          ...generateNodesFromDOM(element.childNodes, editor, newFormat)
        );
        lexicalNodes.push(linkNode);
        continue;
      }

      let blockNode: ElementNode | null = null;
      if (["p", "div"].indexOf(tag) !== -1) {
        blockNode = $createParagraphNode();
      } else if (/^h[1-6]$/.test(tag)) {
        blockNode = $createHeadingNode(tag as HeadingTagType);
      } else if (tag === "blockquote") {
        blockNode = $createQuoteNode();
      } else if (tag === "ul") {
        blockNode = $createListNode("bullet");
      } else if (tag === "ol") {
        blockNode = $createListNode("number");
      } else if (tag === "li") {
        blockNode = $createListItemNode();
      } else {
        // Unknown tag, recurse
        lexicalNodes.push(
          ...generateNodesFromDOM(element.childNodes, editor, newFormat)
        );
        continue;
      }

      const childNodes = generateNodesFromDOM(element.childNodes, editor, 0); // reset format for blocks
      blockNode.append(...childNodes);
      lexicalNodes.push(blockNode);
    }
  }
  return lexicalNodes;
}

export default function InitialContentPlugin({
  initialHtml
}: {
  initialHtml?: string;
}) {
  const [editor] = useLexicalComposerContext();
  const isSet = useRef(false);

  useEffect(() => {
    if (!initialHtml || isSet.current) return;
    isSet.current = true;

    editor.update(() => {
      const root = $getRoot();
      root.clear();
      const parser = new DOMParser();
      const dom = parser.parseFromString(initialHtml, "text/html");
      const nodes = generateNodesFromDOM(dom.body.childNodes, editor);

      let currentParagraph: ParagraphNode | null = null;
      for (const node of nodes) {
        if ($isElementNode(node) && !node.isInline()) {
          if (currentParagraph) {
            root.append(currentParagraph);
            currentParagraph = null;
          }
          root.append(node);
        } else {
          if (!currentParagraph) {
            currentParagraph = $createParagraphNode();
          }
          currentParagraph.append(node);
        }
      }
      if (currentParagraph) {
        root.append(currentParagraph);
      }
    });
  }, [editor, initialHtml]);

  return null;
}
