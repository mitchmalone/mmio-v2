// @ts-nocheck
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import slugify from "./slugify";

// Specify the directory path you want to read
const directoryPath = path.join(process.cwd(), "src", "posts", "case-studies");

/**
 * Retrieves the contents of the works/case-studies directory, including title, slug, start date, and end date for each work.
 *
 * @return {Promise<Array<{title: string, slug: string, startDate: Date, endDate: Date | null}>>} An array of objects containing the title, slug, start date, and end date for each work.
 */
export async function getWorksDirContents() {
  try {
    // Read all files in the directory
    const files = await fs.readdir(directoryPath);

    // List all files in the directory
    const promises = files.map(async (file) => {
      // Read the content of each file
      const filePath = path.join(directoryPath, file);
      const markdownContent = await fs.readFile(filePath, "utf-8");
      const { data: frontmatterJson } = matter(markdownContent);

      return {
        title: frontmatterJson.name,
        slug: slugify(frontmatterJson.name),
        startDate: new Date(frontmatterJson.date.start),
        endDate: !frontmatterJson.date.end
          ? null
          : new Date(frontmatterJson.date.end),
      };
    });

    // Wait for all promises to resolve
    const results = await Promise.all(promises);

    // return results
    return results.sort(
      (prevData, nextData) => nextData.startDate - prevData.startDate,
    );
  } catch (err) {
    console.error("Unable to scan directory:", err);
  }
}

/**
 * Retrieves markdown content and frontmatter data from a file based on the provided slug.
 *
 * @param {string} slug - The slug of the markdown file to retrieve.
 * @return {object} An object containing the frontmatter data and markdown content.
 */
export async function getMarkdownItems(slug: string) {
  try {
    // Get markdown full path
    const filePath = path.join(directoryPath, `${slug}.md`);

    // Read markdown file
    const markdownContent = await fs.readFile(filePath, "utf-8");

    // Parse markdown content
    const { data: frontmatterJson, content } = matter(markdownContent);

    // return results
    return {
      frontmatter: {
        title: frontmatterJson.name,
        slug: slugify(frontmatterJson.name),
        startDate: new Date(frontmatterJson.date.start),
        intro: frontmatterJson.intro,
        endDate: !frontmatterJson.date.end
          ? null
          : new Date(frontmatterJson.date.end),
        logo: frontmatterJson.tilelogo.at(0),
        image: frontmatterJson.tileimg.at(0),
      },
      content,
    };
  } catch (err) {
    console.error("Unable to get markdown content:", err);
  }
}
