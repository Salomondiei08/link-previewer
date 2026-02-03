"use client";

import { LinkMetadata } from "@/types/metadata";
import Image from "next/image";

interface TwitterPreviewProps {
  metadata: LinkMetadata;
}

/**
 * Renders a preview card as it would appear when shared on Twitter/X
 * Supports both summary and summary_large_image card types
 */
export function TwitterPreview({ metadata }: TwitterPreviewProps) {
  const isLargeCard = metadata.twitterCard === "summary_large_image";
  const title = metadata.twitterTitle || metadata.title;
  const description = metadata.twitterDescription || metadata.description;
  const image = metadata.twitterImage || metadata.image;

  // Extract domain from URL
  let domain = "";
  try {
    domain = new URL(metadata.url).hostname.replace("www.", "");
  } catch {
    domain = metadata.siteName;
  }

  if (isLargeCard) {
    return (
      <div className="max-w-[504px] font-sans">
        <div className="overflow-hidden rounded-2xl border border-[#2f3336] bg-black">
          {image && (
            <div className="relative aspect-[1.91/1] w-full bg-[#16181c]">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <div className="px-3 py-3">
            <div className="text-[13px] leading-4 text-[#71767b]">{domain}</div>
            <div className="mt-0.5 truncate text-[15px] leading-5 text-[#e7e9ea]">
              {title}
            </div>
            <div className="mt-0.5 line-clamp-2 text-[15px] leading-5 text-[#71767b]">
              {description}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Summary card (small image on left)
  return (
    <div className="max-w-[504px] font-sans">
      <div className="flex overflow-hidden rounded-2xl border border-[#2f3336] bg-black">
        {image && (
          <div className="relative h-[125px] w-[125px] flex-shrink-0 bg-[#16181c]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="flex flex-col justify-center px-3 py-2">
          <div className="text-[13px] leading-4 text-[#71767b]">{domain}</div>
          <div className="mt-0.5 truncate text-[15px] leading-5 text-[#e7e9ea]">
            {title}
          </div>
          <div className="mt-0.5 line-clamp-2 text-[13px] leading-4 text-[#71767b]">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
