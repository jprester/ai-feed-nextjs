import { useEffect } from "react";

import Image from "next/image";
import { XMLParser } from "fast-xml-parser";
import { Inter } from "next/font/google";

import { FEED_SOURCES, PROXY_SERVER } from "@/helpers/apiConfig";
import { parseFeedData } from "@/helpers/utils";
import Loader from "@/components/common/Loader";
import { IArticleList } from "@/types/types";
import ArticleList from "@/components/widgets/ArticleList/ArticleList";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ updatedArray }: any) {
  return <div> {updatedArray && displayData(updatedArray)}</div>;
}

const displayData = (data: IArticleList[]) => {
  if (!data || data.length === 0) return <Loader />;
  return data.map((feed) => {
    if (feed.data && feed.data.length > 0) {
      return (
        <ArticleList
          data={feed.data}
          moreButton={feed.webLink}
          type={feed.type}
          name={feed.name}
          feedName={feed.feedName}
          key={feed.name}
        />
      );
    }
  });
};

export async function getStaticProps() {
  const parser = new XMLParser();

  const feedRequestData = Object.entries(FEED_SOURCES).map(([key, value]) => ({
    id: key.toUpperCase(),
    ...value,
  }));

  try {
    const dataPromises = feedRequestData.map((dataObject) =>
      fetch(dataObject.FEED).then(async (response) => {
        const xmlResponse = await response.text();

        const parsedResult = parser.parse(xmlResponse);

        const parsedFeedData = parseFeedData(parsedResult, 5);

        return {
          feedName: dataObject.NAME,
          webLink: dataObject.WEB_LINK,
          name: dataObject.NAME,
          type: dataObject.TYPE,
          data: parsedFeedData,
        };
      })
    );
    const promiseData = await Promise.all(dataPromises);

    const updatedArray = promiseData
      .filter((item) => item?.data?.length > 0)
      .sort((a, b) => {
        // Sort entries by the date of the first article
        if (a.data[0].published < b.data[0].published) return 1;
        if (a.data[0].published > b.data[0].published) return -1;
        return 0;
      });

    return {
      props: {
        updatedArray,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
      },
    };
  }
}
