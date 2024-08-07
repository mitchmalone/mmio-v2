export type ArticleInfo = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  publication_id: string;
  published_at: string; // YYYY-MM-DD HH:MM:SS
  last_modified_at: string; // YYYY-MM-DD HH:MM:SS
  tags: string[];
  topics: string[];
  claps: number;
  voters: number;
  word_count: number;
  responses_count: number;
  reading_time: number;
  url: string;
  unique_slug: string;
  image_url: string;
  lang: string;
  is_series: boolean;
  is_locked: boolean;
  is_shortform: boolean;
  top_highlight: string;
};

export type WorkInfo = {
  name: string;
  intro: string;
  titlelogo: string[];
  date: {
    start: string;
    end: string | null;
    zone: string | null;
  };
  titlecolor: string;
  pagebg: string[];
  category: string;
  url: string | null;
  logowhite: string[];
  titleimg: string[];
  inverted: boolean;
};
