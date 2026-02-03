"use client";

import { useState } from "react";
import { UrlInput } from "@/components/UrlInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TwitterPreview,
  FacebookPreview,
  LinkedInPreview,
  DiscordPreview,
  SlackPreview,
} from "@/components/previews";
import { LinkMetadata } from "@/types/metadata";

/**
 * Loading skeleton for preview cards
 */
function PreviewSkeleton() {
  return (
    <div className="w-full max-w-[500px]">
      <Skeleton className="aspect-[1.91/1] w-full rounded-t-lg" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

/**
 * Main page component for the Link Previewer app
 */
export default function Home() {
  const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setMetadata(null);

    try {
      const response = await fetch("/api/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch preview");
      }

      setMetadata(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Link Previewer
          </h1>
          <p className="mt-2 text-muted-foreground">
            See how your links will appear when shared on social networks
          </p>
        </div>

        {/* URL Input */}
        <div className="mb-8">
          <UrlInput onSubmit={handleUrlSubmit} isLoading={isLoading} />
        </div>

        {/* Error Message */}
        {error && (
          <Card className="mb-8 border-destructive/50 bg-destructive/10">
            <CardContent className="py-4">
              <p className="text-center text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Previews */}
        {(isLoading || metadata) && (
          <Tabs defaultValue="twitter" className="w-full">
            <TabsList className="mb-6 flex h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
              <TabsTrigger
                value="twitter"
                className="rounded-full border border-border bg-secondary/50 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Twitter / X
              </TabsTrigger>
              <TabsTrigger
                value="facebook"
                className="rounded-full border border-border bg-secondary/50 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Facebook
              </TabsTrigger>
              <TabsTrigger
                value="linkedin"
                className="rounded-full border border-border bg-secondary/50 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                LinkedIn
              </TabsTrigger>
              <TabsTrigger
                value="discord"
                className="rounded-full border border-border bg-secondary/50 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Discord
              </TabsTrigger>
              <TabsTrigger
                value="slack"
                className="rounded-full border border-border bg-secondary/50 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Slack
              </TabsTrigger>
            </TabsList>

            <div className="flex justify-center">
              <TabsContent value="twitter" className="mt-0">
                {isLoading ? (
                  <PreviewSkeleton />
                ) : (
                  metadata && <TwitterPreview metadata={metadata} />
                )}
              </TabsContent>

              <TabsContent value="facebook" className="mt-0">
                {isLoading ? (
                  <PreviewSkeleton />
                ) : (
                  metadata && <FacebookPreview metadata={metadata} />
                )}
              </TabsContent>

              <TabsContent value="linkedin" className="mt-0">
                {isLoading ? (
                  <PreviewSkeleton />
                ) : (
                  metadata && <LinkedInPreview metadata={metadata} />
                )}
              </TabsContent>

              <TabsContent value="discord" className="mt-0">
                {isLoading ? (
                  <PreviewSkeleton />
                ) : (
                  metadata && <DiscordPreview metadata={metadata} />
                )}
              </TabsContent>

              <TabsContent value="slack" className="mt-0">
                {isLoading ? (
                  <PreviewSkeleton />
                ) : (
                  metadata && <SlackPreview metadata={metadata} />
                )}
              </TabsContent>
            </div>
          </Tabs>
        )}

        {/* Empty State */}
        {!isLoading && !metadata && !error && (
          <Card className="border-dashed">
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <svg
                  className="mx-auto h-12 w-12 mb-4 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <p className="text-lg font-medium">Enter a URL to see previews</p>
                <p className="mt-1 text-sm">
                  See how your content will look on Twitter, Facebook, LinkedIn, Discord, and Slack
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Metadata Display */}
        {metadata && (
          <Card className="mt-8">
            <CardContent className="py-6">
              <h2 className="mb-4 text-lg font-semibold">Extracted Metadata</h2>
              <div className="grid gap-3 text-sm">
                <MetadataRow label="Title" value={metadata.title} />
                <MetadataRow label="Description" value={metadata.description} />
                <MetadataRow label="Image" value={metadata.image} isLink />
                <MetadataRow label="Site Name" value={metadata.siteName} />
                <MetadataRow label="Type" value={metadata.type} />
                <MetadataRow label="Twitter Card" value={metadata.twitterCard} />
                {metadata.twitterSite && (
                  <MetadataRow label="Twitter Site" value={metadata.twitterSite} />
                )}
                {metadata.author && (
                  <MetadataRow label="Author" value={metadata.author} />
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}

/**
 * Helper component to display metadata rows
 */
function MetadataRow({
  label,
  value,
  isLink = false,
}: {
  label: string;
  value: string;
  isLink?: boolean;
}) {
  if (!value) return null;

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
      <span className="min-w-[120px] font-medium text-muted-foreground">
        {label}:
      </span>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-primary hover:underline"
        >
          {value}
        </a>
      ) : (
        <span className="break-words text-foreground">{value}</span>
      )}
    </div>
  );
}
