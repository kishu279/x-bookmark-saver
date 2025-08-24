import { Client } from "@notionhq/client";
import { NOTION_API_TOKEN } from "../config";

export const notion = new Client({ auth: NOTION_API_TOKEN });

// https://www.notion.so/experimental-2529519da46e8032b98cdac840dea958?source=copy_link

export async function createDatabase(
  pageId: string = "2529519da46e8032b98cdac840dea958"
) {
  try {
    const response = await notion.databases.create({
      parent: {
        type: "page_id",
        page_id: pageId,
      },
      properties: {
        title: { type: "title", title: {} },
        subtitle: { type: "title", title: {} },
        link: { type: "url", url: {} },
        date: { type: "date", date: {} },
      },
    });

    console.log("Database ID:", response.id);

    console.log("Database created successfully:", response);
    return response;
  } catch (error) {
    console.error("Error creating database:", error);
    return error;
  }
}

async function updateDatabase(databaseId: string) {
  try {
    console.log("Updating database:", databaseId);

    // const response = await notion.databases.update({ database_id: databaseId });
  } catch (error) {
    console.error("Error updating database:", error);
  }
}
