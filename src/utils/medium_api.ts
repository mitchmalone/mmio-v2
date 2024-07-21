const HOST = process.env.MEDIUM_API_HOST ?? "";
const API_KEY = process.env.MEDIUM_API_KEY ?? "";
const USER_ID = process.env.MEDIUM_API_USER_ID ?? "";

const logError = console.log;
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": HOST.replace(/(^\w+:|^)\/\//, ""),
  },
};

export const getArticleInfo = async (id: string) => {
  try {
    const response = await fetch(`${HOST}/article/${id}`, options);
    const result = await response.json();
    return result;
  } catch (error) {
    logError(error);
  }
  return false;
};

export const getArticleMarkdown = async (id: string) => {
  try {
    const response = await fetch(`${HOST}/article/${id}/markdown`, options);
    const result = await response.json();
    return result.markdown;
  } catch (error) {
    logError(error);
  }
  return false;
};

export const getUserArticles = async () => {
  try {
    const response = await fetch(`${HOST}/user/${USER_ID}/articles`, options);
    const result = await response.json();
    const articleIds = result.associated_articles;
    return await Promise.all(
      articleIds.map(async (id: string) => getArticleInfo(id))
    );
  } catch (error) {
    logError(error);
  }
  return false;
};
