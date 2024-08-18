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
 * Clones case studies from a GitHub repository and downloads their contents.
 *
 * @return {Promise<Array<void>>} A promise that resolves when all case studies have been cloned and their contents downloaded.
 */
const cloneCaseStudies = async () => {
  const { data: caseStudiesData } = await octokit.repos.getContent(repoConfig);

  // Loop through each case study
  const promises = caseStudiesData
    .filter((caseStudyItem) => {
      // Filter out items that contain a certain character
      const { name } = caseStudyItem;
      return !name.includes(":");
    })
    .map(async (caseStudyItem) => {
      const { name, path: filePath } = caseStudyItem;
      const itemContentConfig = {
        owner: repoConfig.owner,
        repo: repoConfig.repo,
        path: filePath,
        branch: repoConfig.branch,
      };
      const itemContentResult =
        await octokit.repos.getContent(itemContentConfig);
      const itemContentResultArray = itemContentResult.data;

      // Slugify the title
      const folderName = slugify(name, { lower: true });

      // Define the folder path
      const folderPath = path.join(
        path.resolve(),
        "src",
        "posts",
        "case-studies",
        folderName,
      );

      // Check if folder exists, if not, create it
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Download all files from item content result
      itemContentResultArray.forEach(async (item) => {
        const { name: itemName, download_url: itemDownloadUrl } = item;

        // Define the file output path
        const itemFilePath = path.join(folderPath, itemName);

        // Download the file
        try {
          await downloadFile(itemDownloadUrl, itemFilePath);
          console.log(
            `\x1b[36m File downloaded successfully to ${itemFilePath} \x1b[0m`,
          );
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
