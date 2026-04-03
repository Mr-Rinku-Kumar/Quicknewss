import React from "react";

const NewsItem = ({ title, description, imgUrl, newsUrl, author, date, source }) => {
  return (
    <div className="my-3">
      <div className="card">

        <span
          className="badge bg-danger"
          style={{ position: "absolute", right: 0, zIndex: 1 }}
        >
          {source}
        </span>

        <img
          src={imgUrl || "https://via.placeholder.com/300x200"}
          className="card-img-top"
          alt="news"
        />

        <div className="card-body">
          <h5 className="card-title">
            {title ? title.slice(0, 60) : "No Title"}...
          </h5>

          <p className="card-text">
            {description
              ? description.slice(0, 100)
              : "No description available"}
            ...
          </p>

          <p className="card-text">
            <small className="text-muted">
              By {author || "Unknown"} on{" "}
              {date ? new Date(date).toGMTString() : "N/A"}
            </small>
          </p>

          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;