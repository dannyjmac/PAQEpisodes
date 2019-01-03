import React from "react";

export const LoadMore = ({ videoList, loadMore }) => {
  if (videoList) {
    return (
      <div className="loadmore">
        {videoList.hasOwnProperty("prevPageToken") ? (
          <button
            className="loadmore__button"
            onClick={e => loadMore(e.target.id, videoList.prevPageToken)}
          >
            NEWER
          </button>
        ) : null}

        {videoList.hasOwnProperty("nextPageToken") ? (
          <button
            className="loadmore__button"
            onClick={e => loadMore(e.target.id, videoList.nextPageToken)}
          >
            OLDER
          </button>
        ) : null}
      </div>
    );
  }
};
