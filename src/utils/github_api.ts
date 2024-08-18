import { Octokit } from "@octokit/rest";
import matter from "gray-matter";
import slugify from "./slugify";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const dirContentsConfig = {
  owner: "mitchmalone",
  repo: "notion-data",
  path: "/markdown/casestudies",
  branch: "main",
};

/**
 * Retrieves the content of a repository and logs the result of each case study item.
 *
 * @return {Promise<void>} A promise that resolves when all case study items have been processed.
 */
export const getRepoContents = async () => {
  const { data: caseStudiesData } =
    await octokit.repos.getContent(dirContentsConfig);

  // Loop through each case study
  const promises = (caseStudiesData as Array<any>).map(
    async (caseStudyItem: any) => {
      const { path } = caseStudyItem;
      const itemContentConfig = {
        owner: dirContentsConfig.owner,
        repo: dirContentsConfig.repo,
        path: path,
        branch: dirContentsConfig.branch,
      };
      const itemContentResult =
        await octokit.repos.getContent(itemContentConfig);
      const itemContentResultArray = itemContentResult.data as Array<any>;

      // Get the markdown file only
      const getMarkdownItems = itemContentResultArray.find((item) => {
        const repoFilePath = item.path;
        return repoFilePath.endsWith(".md");
      });

      const markdownConfig = {
        owner: dirContentsConfig.owner,
        repo: dirContentsConfig.repo,
        path: getMarkdownItems.path,
        branch: dirContentsConfig.branch,
      };
      const rawContentResult = await octokit.repos.getContent(markdownConfig);

      if ("content" in rawContentResult.data) {
        return atob(rawContentResult.data.content);
      }

      return false;
    },
  );

  return await Promise.all(promises);
};

/**
 * Retrieves all frontmatters from the repository.
 *
 * @return {Promise<Array<{ data: any, content: string }>>} An array of objects containing the frontmatter data and content, sorted by date.
 */
export const getAllFrontmatters = async () => {
  const repoContents = await getRepoContents();

  return repoContents
    .map((item: any) => {
      const { data, content } = matter(item);
      return { data, content };
    })
    .sort((prev, next) => {
      const { data: prevData } = prev;
      const { data: nextData } = next;
      // @ts-ignore
      return new Date(nextData.date.start) - new Date(prevData.date.start);
    });
};

export const getFrontmatter = async (slug: string) => {
  const allFrontmatters = await getAllFrontmatters();
  const item = allFrontmatters.find((item) => {
    const itemSlug = slugify(item.data.name);
    return itemSlug === slug;
  });

  return item;
};
