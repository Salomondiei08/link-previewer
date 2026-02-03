"use client";

import { LinkMetadata } from "@/types/metadata";
import Image from "next/image";

interface SlackPreviewProps {
  metadata: LinkMetadata;
}

/**
 * Renders a preview card as it would appear when shared on Slack
 * Slack has a characteristic left border similar to Discord but in gray
 */
export function SlackPreview({ metadata }: SlackPreviewProps) {
  const title = metadata.title;
  const description = metadata.description;
  const image = metadata.image;
  const siteName = metadata.siteName;
  const favicon = metadata.favicon;

  return (
    <div className="max-w-[560px] font-sans">
      <div className="overflow-hidden rounded-md border-l-[4px] border-l-[#616061] bg-[#1a1d21] pl-3 pr-4 py-2">
        <div className="flex items-center gap-2">
          {favicon && (
            <div className="relative h-4 w-4 flex-shrink-0">
              <Image
                src={favicon}
                alt=""
                width={16}
                height={16}
                className="rounded-sm"
                unoptimized
              />
            </div>
          )}
          <div className="text-[13px] font-bold text-[#e8e8e8]">
            {siteName}
          </div>
        </div>
        <div className="mt-1 text-[15px] font-bold leading-5 text-[#1d9bd1] hover:underline">
          {title}
        </div>
        {description && (
          <div className="mt-1 line-clamp-2 text-[15px] leading-5 text-[#d1d2d3]">
            {description}
          </div>
        )}
        {image && (
          <div className="relative mt-2 h-[200px] w-full max-w-[360px] overflow-hidden rounded bg-[#232529]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );
}
