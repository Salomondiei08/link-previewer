/**
 * Metadata structure for Open Graph and Twitter Card data
 */
export interface LinkMetadata {
  url: string;
  title: string;
  description: string;
  image: string;
  siteName: string;
  favicon: string;
  type: string;
  // Twitter-specific
  twitterCard: string;
  twitterSite: string;
  twitterCreator: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  // Additional
  author: string;
  publishedTime: string;
  themeColor: string;
}
