"use client";

import { LinkMetadata } from "@/types/metadata";
import Image from "next/image";

interface LinkedInPreviewProps {
  metadata: LinkMetadata;
}

/**
 * Renders a preview card as it would appear when shared on LinkedIn
 */
export function LinkedInPreview({ metadata }: LinkedInPreviewProps) {
  const title = metadata.title;
  const image = metadata.image;

  // Extract domain from URL
  let domain = "";
  try {
    domain = new URL(metadata.url).hostname.replace("www.", "");
  } catch {
    domain = metadata.siteName;
  }

  return (
    <div className="max-w-[552px] font-sans">
      <div className="overflow-hidden rounded-lg border border-[#38434f] bg-[#1d2226]">
        {image && (
          <div className="relative aspect-[1.91/1] w-full bg-[#000]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="px-4 py-3">
          <div className="line-clamp-2 text-[14px] font-semibold leading-5 text-[#ffffff]">
            {title}
          </div>
          <div className="mt-1 text-[12px] leading-4 text-[#ffffff99]">
            {domain}
          </div>
        </div>
      </div>
    </div>
  );
}
