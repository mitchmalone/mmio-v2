/**
 * Removes the specified title from the given markdown string and returns the remaining content.
 *
 * @param {string} title - The title to be removed.
 * @param {string} markdown - The markdown string to remove the title from.
 * @return {string | undefined} - The remaining content after removing the title, or undefined if the title is not found.
 */
function removeTitle(title: string, markdown: string) {
  const articleMarkdownArray = markdown.split(`${title}\n\n`);
  const articleContent = articleMarkdownArray.slice(-1).at(0);

  return articleContent;
}

export default removeTitle;
