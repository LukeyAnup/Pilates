import { useEffect, useState } from "react";
import client from "../../contentfulClient";
import ReformerPilates from "./reformerPilates";

type TabData = {
  entryId: string;
  tabTitle: string;
};

type ReformerPilatesFields = {
  tabTitle?: string;
  // ... other fields (we only need tabTitle for the tabs)
};

type ReformerPilatesSkeleton = {
  fields: ReformerPilatesFields;
  contentTypeId: "reformerPilates";
  sys: {
    id: string;
  };
};

export default function PilatesTabs() {
  const [tabs, setTabs] = useState<TabData[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTabData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch all ReformerPilates entries to get their tabTitles and entry IDs
        const res = await client.getEntries<ReformerPilatesSkeleton>({
          content_type: "reformerPilates",
        });

        if (res.items.length === 0) {
          setError("No ReformerPilates entries found");
          return;
        }

        // Map the entries to tab data
        const tabData: TabData[] = res.items.map((item: any) => ({
          entryId: item.sys.id,
          tabTitle: item.fields.tabTitle || "Untitled Tab",
        }));

        setTabs(tabData);
      } catch (err) {
        console.error("Failed to fetch tab data:", err);
        setError("Failed to fetch tab data from Contentful");
      } finally {
        setLoading(false);
      }
    }

    fetchTabData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg text-gray-600">Loading tabs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (tabs.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg text-gray-600">No tabs available</div>
      </div>
    );
  }

  const activeTab = tabs[activeTabIndex];

  return (
    <div className="w-full md:max-w-4/5 mx-auto p-4">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex flex-col md:flex-row" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.entryId}
              onClick={() => setActiveTabIndex(index)}
              className={`
                whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm transition-colors text-start md:text-center duration-200 cursor-pointer
                ${
                  index === activeTabIndex
                    ? "text-white bg-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
              aria-current={index === activeTabIndex ? "page" : undefined}
            >
              <p>{tab.tabTitle}</p>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        <div>
          <ReformerPilates />
        </div>
      </div>
    </div>
  );
}
