import React from "react";

import Loader from "../../common/Loader";
import ArticleListItem from "./ArticleListItem";
import { IArticleList, IArticleDataItem } from "../../../types/types";

const ArticleList = ({
  data,
  moreButton,
  name,
  type,
  feedName,
}: IArticleList) => {
  return (
    <div className="article-list-container">
      {data && data.length ? (
        <div className="mb-10">
          <h3
            className="feed-list-title text-lg font-semibold text-gray-900 dark:text-white"
            id={feedName}
          >
            {name}
          </h3>
          <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-100"></hr>
          <ul className="article-list">{createArticleList(data, type)}</ul>
          {moreButton && (
            <div className="show-more">
              <a href={moreButton} className="show-more-button">
                Show more
              </a>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

const createArticleList = (
  list: IArticleDataItem[],
  type: string,
  maxItems: number = type === "videos" ? 4 : 10
) =>
  list.map((item, index: number) => {
    const { title, contentSnippet, link, isoDate, id } = item;

    if (title && index <= maxItems) {
      return (
        <ArticleListItem
          key={title}
          title={title}
          link={link}
          id={id}
          contentSnippet={contentSnippet}
          isoDate={isoDate}
          type={type}
        />
      );
    }
  });

export default ArticleList;
