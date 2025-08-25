import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Twitter,
  Youtube,
} from "lucide-react";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  sidebarCollapsed: boolean;
  activeSection: "youtube" | "twitter" | "notion" | "default";
  handleSectionClick: (section: "youtube" | "twitter" | "notion") => void;
  setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
}

export default function SidebarSection({
  sidebarCollapsed,
  activeSection,
  handleSectionClick,
  setSidebarCollapsed,
}: SidebarProps) {
  return (
    <div
      className={`${
        sidebarCollapsed ? "w-16" : "w-64"
      } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        {!sidebarCollapsed && (
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            Boookiess
          </h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Fetch Section */}
        <div>
          {!sidebarCollapsed && (
            <h3 className="text-sm font-medium text-sidebar-foreground mb-3">
              Fetch
            </h3>
          )}
          <div className="space-y-2">
            <Button
              variant={activeSection === "youtube" ? "default" : "ghost"}
              className={`w-full justify-start ${
                sidebarCollapsed ? "px-2" : ""
              }`}
              onClick={() => handleSectionClick("youtube")}
            >
              <Youtube className="h-4 w-4" />
              {!sidebarCollapsed && <span className="ml-2">From YouTube</span>}
            </Button>
            <Button
              variant={activeSection === "twitter" ? "default" : "ghost"}
              className={`w-full justify-start ${
                sidebarCollapsed ? "px-2" : ""
              }`}
              onClick={() => handleSectionClick("twitter")}
            >
              <Twitter className="h-4 w-4" />
              {!sidebarCollapsed && (
                <span className="ml-2">From X (Twitter)</span>
              )}
            </Button>
          </div>
        </div>

        {/* Integrations Section */}
        <div>
          {!sidebarCollapsed && (
            <h3 className="text-sm font-medium text-sidebar-foreground mb-3">
              Integrations
            </h3>
          )}
          <Button
            variant={activeSection === "notion" ? "default" : "ghost"}
            className={`w-full justify-start ${sidebarCollapsed ? "px-2" : ""}`}
            onClick={() => handleSectionClick("notion")}
          >
            <FileText className="h-4 w-4" />
            {!sidebarCollapsed && (
              <span className="ml-2">Connect with Notion</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
