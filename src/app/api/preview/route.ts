import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

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

/**
 * Resolves a relative URL to an absolute URL
 */
function resolveUrl(baseUrl: string, relativeUrl: string): string {
  if (!relativeUrl) return "";
  if (relativeUrl.startsWith("http://") || relativeUrl.startsWith("https://")) {
    return relativeUrl;
  }
  if (relativeUrl.startsWith("//")) {
    return `https:${relativeUrl}`;
  }
  try {
    return new URL(relativeUrl, baseUrl).href;
  } catch {
    return relativeUrl;
  }
}

/**
 * Extracts metadata from HTML using Open Graph and Twitter Card tags
 */
function extractMetadata(html: string, url: string): LinkMetadata {
  const $ = cheerio.load(html);

  // Helper to get meta content by property or name
  const getMeta = (selectors: string[]): string => {
    for (const selector of selectors) {
      const content =
        $(`meta[property="${selector}"]`).attr("content") ||
        $(`meta[name="${selector}"]`).attr("content");
      if (content) return content;
    }
    return "";
  };

  // Get favicon
  let favicon =
    $('link[rel="icon"]').attr("href") ||
    $('link[rel="shortcut icon"]').attr("href") ||
    $('link[rel="apple-touch-icon"]').attr("href") ||
    "/favicon.ico";
  favicon = resolveUrl(url, favicon);

  // Get image
  let image = getMeta(["og:image", "og:image:url", "twitter:image", "twitter:image:src"]);
  image = resolveUrl(url, image);

  // Get Twitter image separately for potential differences
  let twitterImage = getMeta(["twitter:image", "twitter:image:src", "og:image"]);
  twitterImage = resolveUrl(url, twitterImage);

  // Extract hostname for site name fallback
  let siteName = "";
  try {
    siteName = new URL(url).hostname.replace("www.", "");
  } catch {
    siteName = url;
  }

  return {
    url,
    title: getMeta(["og:title"]) || $("title").text() || "",
    description:
      getMeta(["og:description", "description"]) ||
      $('meta[name="description"]').attr("content") ||
      "",
    image,
    siteName: getMeta(["og:site_name"]) || siteName,
    favicon,
    type: getMeta(["og:type"]) || "website",
    // Twitter Card
    twitterCard: getMeta(["twitter:card"]) || "summary",
    twitterSite: getMeta(["twitter:site"]) || "",
    twitterCreator: getMeta(["twitter:creator"]) || "",
    twitterTitle: getMeta(["twitter:title", "og:title"]) || $("title").text() || "",
    twitterDescription:
      getMeta(["twitter:description", "og:description"]) ||
      $('meta[name="description"]').attr("content") ||
      "",
    twitterImage,
    // Additional
    author: getMeta(["author", "article:author"]) || "",
    publishedTime: getMeta(["article:published_time", "og:published_time"]) || "",
    themeColor: getMeta(["theme-color"]) || "",
  };
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL format
    let validatedUrl: URL;
    try {
      validatedUrl = new URL(url);
      if (!["http:", "https:"].includes(validatedUrl.protocol)) {
        return NextResponse.json(
          { error: "Only HTTP and HTTPS URLs are supported" },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Fetch the URL with timeout and proper headers
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(validatedUrl.href, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; LinkPreviewer/1.0; +https://link-previewer.app)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      redirect: "follow",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status} ${response.statusText}` },
        { status: 400 }
      );
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
      return NextResponse.json(
        { error: "URL does not return HTML content" },
        { status: 400 }
      );
    }

    const html = await response.text();
    const metadata = extractMetadata(html, validatedUrl.href);

    return NextResponse.json(metadata);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return NextResponse.json({ error: "Request timed out" }, { status: 408 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
