import { useEffect } from "react";

import Image from "next/image";
import { XMLParser } from "fast-xml-parser";
import { Inter } from "next/font/google";

import { FEED_SOURCES, PROXY_SERVER } from "@/helpers/apiConfig";
import { parseFeedData } from "@/helpers/utils";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ updatedArray }: any) {
  console.log("rendered data: ", updatedArray);

  return <div>Home</div>;
}

// export async function getServerSideProps() {
//   const parser = new XMLParser();

//   const feedRequestData = Object.entries(FEED_SOURCES).map(([key, value]) => ({
//     id: key.toUpperCase(),
//     ...value,
//   }));

//   console.log("feedRequestData: ", feedRequestData);

//   const newDataArray = await Promise.all(
//     feedRequestData.map(async (dataObject) => {
//       const response = await fetch(`${PROXY_SERVER}/${dataObject.FEED}`);

//       const xmlResponse = await response.text();

//       const parsedResult = parser.parse(xmlResponse);

//       console.log("parsedResult: ", parsedResult);
//       const parsedFeedData = parseFeedData(parsedResult);

//       return {
//         feedName: dataObject.NAME,
//         webLink: dataObject.WEB_LINK,
//         name: dataObject.NAME,
//         type: dataObject.TYPE,
//         data: parsedFeedData.entry || parsedFeedData.item,
//       };
//     })
//   );

//   const updatedArray = newDataArray
//     .filter((item) => item?.data?.length > 0)
//     .sort((a, b) => {
//       // Sort entries by the date of the first article
//       if (a.data[0].published < b.data[0].published) return 1;
//       if (a.data[0].published > b.data[0].published) return -1;
//       return 0;
//     });

//   return {
//     props: {
//       updatedArray,
//     },
//   };
// }

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
