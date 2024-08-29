import { visit } from "unist-util-visit";
import { Node } from "unist";
import { remark } from "remark";
import remarkImages from "remark-images";
import remarkDefsplit from "remark-defsplit";

interface ImageNode extends Node {
  url?: string;
}

export function replaceImageUrls(tree: Node, path: string) {
  visit(tree, "image", (node: ImageNode) => {
    if (node.url) {
      const imageUrl = node.url.startsWith("./") ? node.url.slice(2) : node.url;
      // Modify the image URL as needed
      node.url = `/case-studies/${path}/${imageUrl}`;
    }
  });
}

export async function markdownInlineImages(
  markdown: string,
  path: string,
): Promise<string> {
  const result = await remark()
    .use(remarkImages)
    .use(() => (tree: Node) => replaceImageUrls(tree, path))
    .use(remarkDefsplit)
    .process(markdown);

  return result.toString();
}
