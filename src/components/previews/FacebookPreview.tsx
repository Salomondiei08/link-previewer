"use client";

import { LinkMetadata } from "@/types/metadata";
import Image from "next/image";

interface FacebookPreviewProps {
  metadata: LinkMetadata;
}

/**
 * Renders a preview card as it would appear when shared on Facebook
 */
export function FacebookPreview({ metadata }: FacebookPreviewProps) {
  const title = metadata.title;
  const description = metadata.description;
  const image = metadata.image;

  // Extract domain from URL
  let domain = "";
  try {
    domain = new URL(metadata.url).hostname.replace("www.", "").toUpperCase();
  } catch {
    domain = metadata.siteName.toUpperCase();
  }

  return (
    <div className="max-w-[500px] font-sans">
      <div className="overflow-hidden border border-[#3e4042] bg-[#242526]">
        {image && (
          <div className="relative aspect-[1.91/1] w-full bg-[#18191a]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="px-3 py-[10px]">
          <div className="text-[12px] leading-4 text-[#b0b3b8]">{domain}</div>
          <div className="mt-[3px] line-clamp-2 text-[16px] font-semibold leading-5 text-[#e4e6eb]">
            {title}
          </div>
          <div className="mt-[3px] line-clamp-1 text-[14px] leading-5 text-[#b0b3b8]">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
