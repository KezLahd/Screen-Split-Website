'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, ChevronDown } from "lucide-react";
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  html_url: string;
  published_at: string;
  assets: GitHubAsset[];
  prerelease: boolean;
}

function formatFileSize(bytes: number) {
  const kb = bytes / 1024;
  return `${kb.toFixed(0)} KB`;
}

export function Releases() {
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await fetch('/api/releases');
        if (!response.ok) {
          throw new Error('Failed to fetch releases');
        }
        const data = await response.json();
        setReleases(data);
        // Set the first release to be open by default
        if (data.length > 0) {
          setOpenStates({ [data[0].tag_name]: true });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReleases();
  }, []);

  if (loading) {
    return <div className="text-center text-muted-foreground">Loading releases...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (releases.length === 0) {
    return <div className="text-center text-muted-foreground">No releases found</div>;
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-[#3b82f6]">
          Updates & Changelog
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Stay up to date with the latest improvements and fixes.
        </p>
      </div>

      <div className="space-y-4">
        {releases.map((release, index) => {
          const date = new Date(release.published_at);
          const isOpen = openStates[release.tag_name] || false;
          const isCurrent = index === 0;

          return (
            <Collapsible
              key={release.tag_name}
              open={isOpen}
              onOpenChange={(open) => setOpenStates({ ...openStates, [release.tag_name]: open })}
              className={`rounded-lg border overflow-hidden ${
                isCurrent 
                  ? 'border-[#3b82f6] bg-[#0f1a2f]' 
                  : 'border-primary/20 bg-[#0f172a]/50'
              }`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CollapsibleTrigger className="flex items-center gap-2 hover:opacity-80">
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                      <div>
                        <h3 className="text-lg font-semibold flex items-center gap-3">
                          Version {release.tag_name}
                          {isCurrent && (
                            <span className="px-2 py-1 text-xs rounded-full bg-primary text-primary-foreground">
                              Current
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">{format(date, 'MMMM d, yyyy')}</p>
                      </div>
                    </CollapsibleTrigger>
                  </div>
                  <div className="flex items-center gap-3">
                    {release.assets.length > 0 && (
                      <Button size="sm" asChild>
                        <a
                          href={release.assets[0].browser_download_url}
                          download
                          className="font-medium"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <a href={release.html_url} target="_blank" rel="noopener noreferrer">
                        View on GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <CollapsibleContent>
                <div className="px-4 pb-4">
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        h2: ({ children }) => (
                          <h2 className="text-white text-lg font-semibold mb-2">{children}</h2>
                        ),
                        p: ({ children }) => (
                          <p className="text-[#94a3b8] mb-4 text-sm">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="space-y-1.5">{children}</ul>
                        ),
                        li: ({ children }) => (
                          <li className="flex items-baseline gap-2 text-[#94a3b8] text-sm">
                            <span className="text-[#3b82f6] text-base leading-none">•</span>
                            <span>{children}</span>
                          </li>
                        ),
                      }}
                    >
                      {release.body}
                    </ReactMarkdown>
                  </div>

                  {release.assets.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-primary/20">
                      <h4 className="text-sm font-semibold mb-3 text-white">Downloads</h4>
                      <div className="space-y-2">
                        {release.assets.map((asset) => (
                          <div
                            key={asset.name}
                            className="flex items-center justify-between py-1.5"
                          >
                            <div className="flex items-center gap-2">
                              <Download className="h-4 w-4 text-primary" />
                              <span className="text-sm text-[#94a3b8]">{asset.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-muted-foreground">
                                {formatFileSize(asset.size)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {asset.download_count.toLocaleString()} downloads
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
} 