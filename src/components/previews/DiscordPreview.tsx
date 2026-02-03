"use client";

import { LinkMetadata } from "@/types/metadata";
import Image from "next/image";

interface DiscordPreviewProps {
  metadata: LinkMetadata;
}

/**
 * Renders a preview card as it would appear when shared on Discord
 * Discord has a distinctive left border accent color
 */
export function DiscordPreview({ metadata }: DiscordPreviewProps) {
  const title = metadata.title;
  const description = metadata.description;
  const image = metadata.image;
  const siteName = metadata.siteName;

  // Use theme color if available, otherwise default Discord embed color
  const accentColor = metadata.themeColor || "#1e90ff";

  return (
    <div className="max-w-[432px] font-sans">
      <div
        className="overflow-hidden rounded bg-[#2b2d31]"
        style={{ borderLeft: `4px solid ${accentColor}` }}
      >
        <div className="p-4">
          {siteName && (
            <div className="mb-1 text-[12px] font-medium text-[#b5bac1]">
              {siteName}
            </div>
          )}
          <div className="mb-1 text-[16px] font-semibold leading-5 text-[#00a8fc] hover:underline">
            {title}
          </div>
          {description && (
            <div className="line-clamp-3 text-[14px] leading-[18px] text-[#dbdee1]">
              {description}
            </div>
          )}
          {image && (
            <div className="relative mt-4 aspect-[1.91/1] w-full overflow-hidden rounded bg-[#1e1f22]">
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
    </div>
  );
}
