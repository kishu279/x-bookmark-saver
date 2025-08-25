"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Youtube,
  Twitter,
  FileText,
  RefreshCw,
} from "lucide-react";
import SidebarSection from "../Section/sidebar-section";

interface Bookmark {
  id: string;
  title: string;
  description: string;
  url: string;
  date: string;
  platform: "twitter" | "youtube";
}

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "default" | "twitter" | "youtube" | "notion"
  >("default");
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTwitterBookmarks = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockBookmarks: Bookmark[] = [
        {
          id: "1",
          title: "Amazing thread about React patterns",
          description:
            "A comprehensive guide to advanced React patterns and best practices for modern development.",
          url: "https://twitter.com/example/status/123",
          date: "2024-01-15",
          platform: "twitter",
        },
        {
          id: "2",
          title: "Web development tips",
          description:
            "Essential tips for becoming a better web developer in 2024.",
          url: "https://twitter.com/example/status/124",
          date: "2024-01-14",
          platform: "twitter",
        },
        {
          id: "3",
          title: "JavaScript performance optimization",
          description:
            "Learn how to optimize your JavaScript code for better performance.",
          url: "https://twitter.com/example/status/125",
          date: "2024-01-13",
          platform: "twitter",
        },
      ];
      setBookmarks(mockBookmarks);
      setLoading(false);
    }, 1000);

    // get the data from the initiate end point
    try {
      // const options = {
      //   method: "GET",
      //   headers: { "Content-Type": "application/json" },
      //   credentials: "include",
      // };

      // make the api call
      // const response = await fetch("/api/auth/initiate", );
      // const response = await fetch("/api/auth/random", {
      //   method: "GET",
      //   headers: {
      //     // "Content-Type": "application/json",
      //   },
      // });

      if (response.status != 200) {
        console.log("Error while fetching");
      }

      // const data = await response.json();
      // console.log({ data });
    } catch (error) {
      console.error("Error while fetching", { error });
    }
  };

  const handleSectionClick = (section: "twitter" | "youtube" | "notion") => {
    setActiveSection(section);
    if (section === "twitter") {
      fetchTwitterBookmarks();
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}

      <SidebarSection
        activeSection={activeSection}
        handleSectionClick={handleSectionClick}
        setSidebarCollapsed={setSidebarCollapsed}
        sidebarCollapsed={sidebarCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Main Content Header */}
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">
            {activeSection === "default" && "Dashboard"}
            {activeSection === "twitter" && "X (Twitter) Bookmarks"}
            {activeSection === "youtube" && "YouTube Bookmarks"}
            {activeSection === "notion" && "Notion Integration"}
          </h1>
        </div>

        {/* Main Content Body */}
        <div className="flex-1 p-6 overflow-auto">
          {activeSection === "default" && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <h2 className="text-xl font-semibold text-muted-foreground">
                  Welcome to Boookiess
                </h2>
                <p className="text-muted-foreground max-w-md">
                  Select a platform from the sidebar to start fetching and
                  organizing your bookmarks.
                </p>
              </div>
            </div>
          )}

          {activeSection === "twitter" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Twitter Bookmarks</h2>
                  <p className="text-muted-foreground">
                    Manage your saved tweets and threads
                  </p>
                </div>
                <Button onClick={fetchTwitterBookmarks} disabled={loading}>
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  Fetch Bookmarks
                </Button>
              </div>

              {loading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="h-3 bg-muted rounded"></div>
                          <div className="h-3 bg-muted rounded w-5/6"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : bookmarks.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {bookmarks.map((bookmark) => (
                    <Card
                      key={bookmark.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base line-clamp-2">
                            {bookmark.title}
                          </CardTitle>
                          <Badge variant="secondary" className="ml-2">
                            <Twitter className="h-3 w-3" />
                          </Badge>
                        </div>
                        <CardDescription className="text-sm text-muted-foreground">
                          {new Date(bookmark.date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                          {bookmark.description}
                        </p>
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Tweet
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Twitter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No bookmarks found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Click "Fetch Bookmarks" to load your Twitter bookmarks
                  </p>
                </div>
              )}
            </div>
          )}

          {activeSection === "youtube" && (
            <div className="text-center py-12">
              <Youtube className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                YouTube Integration
              </h3>
              <p className="text-muted-foreground mb-4">
                YouTube bookmark fetching coming soon!
              </p>
              <Button disabled>Connect YouTube</Button>
            </div>
          )}

          {activeSection === "notion" && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Notion Integration</h3>
              <p className="text-muted-foreground mb-4">
                Connect your Notion workspace to sync bookmarks
              </p>
              <Button>Connect with Notion</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
