export type movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: number;
};
export type article = {
  byline: string;
  critics_pick: number;
  date_updated: string;
  display_title: string;
  headline: string;
  link: {
    type: string;
    url: string;
    suggested_link_text: string;
  };
  mpaa_rating: string;
  multimedia: null;
  opening_date: string;
  publication_date: string;
  summary_short: string;
};
export type articles = {
  copyright: string;
  has_more: boolean;
  num_results: number;
  results: Array<article>;
  status: string;
};
