import fs from "fs";
import path from "path";
import axios from "axios";
import { Octokit } from "@octokit/rest";
import slugify from "slugify";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const repoConfig = {
  owner: "mitchmalone",
  repo: "notion-data",
  path: "/markdown/casestudies",
  branch: "main",
};

/**
 * Downloads a file from a given URL and saves it to a specified output path.
 *
 * @param {string} url - The URL of the file to be downloaded.
 * @param {string} outputPath - The path where the downloaded file will be saved.
 * @return {Promise<void>} A promise that resolves when the file has been downloaded and saved.
 */
const downloadFile = async (url, outputPath) => {
  const writer = fs.createWriteStream(outputPath);
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

/**
 * Generates a URL-friendly slug from a given string.
 *
 * @param {string} str - The input string to be slugified.
 * @return {string} The slugified string.
 */
const slugger = (str) => {
  return slugify(str, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
  });
};

/**
 * Clones case studies from a GitHub repository and downloads their contents.
 *
 * @return {Promise<Array<void>>} A promise that resolves when all case studies have been cloned and their contents downloaded.
 */
const cloneCaseStudies = async () => {
  const { data: caseStudiesData } = await octokit.repos.getContent(repoConfig);

  // Loop through each case study
  const promises = caseStudiesData.map(async (caseStudyItem) => {
    const { name, path: filePath } = caseStudyItem;
    const itemContentConfig = {
      owner: repoConfig.owner,
      repo: repoConfig.repo,
      path: filePath,
      branch: repoConfig.branch,
    };
    const itemContentResult = await octokit.repos.getContent(itemContentConfig);
    const itemContentResultArray = itemContentResult.data;

    // Slugify the title
    const folderName = slugger(name);

    // Define the folder path for markdowns
    const markdownFolderPath = path.join(
      path.resolve(),
      "src",
      "posts",
      "case-studies",
    );

    const imageFolderPath = path.join(
      path.resolve(),
      "public",
      "work",
      folderName,
    );

    // Check if folder exists, if not, create it
    if (!fs.existsSync(markdownFolderPath)) {
      fs.mkdirSync(markdownFolderPath, { recursive: true });
    }
    if (!fs.existsSync(imageFolderPath)) {
      fs.mkdirSync(imageFolderPath, { recursive: true });
    }

    // Download all files from item content result
    itemContentResultArray.forEach(async (item) => {
      const { name: itemName, download_url: itemDownloadUrl } = item;
      const targetName = itemName.replaceAll(":", "");

      // Define the file output path
      const markdownItemFilePath = path.join(markdownFolderPath, targetName);
      const imageItemFilePath = path.join(imageFolderPath, targetName);

      // Download the file
      try {
        const targetFolder = targetName.endsWith(".md")
          ? markdownItemFilePath
          : imageItemFilePath;
        await downloadFile(itemDownloadUrl, targetFolder);
        console.log(`\x1b[36m "${targetName}" successfully downloaded \x1b[0m`);
      } catch (error) {
        console.error(
          `\x1b[41m Failed to download file: ${error.message} \x1b[0m`,
        );
      }
    });
  });

  return await Promise.all(promises);
};

cloneCaseStudies();
