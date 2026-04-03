import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const Newss = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);
    props.setProgress(20);

    let data = await fetch(url);
    let parsedData = await data.json();

    props.setProgress(50);

    setArticles(parsedData.articles || []);
    setTotalResults(parsedData.totalResults || 0);
    setLoading(false);

    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${Capitalize(props.category)} - QuickNews`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${nextPage}&pageSize=${props.pageSize}`;

    setPage(nextPage);

    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles((prev) => prev.concat(parsedData.articles || []));
    setTotalResults(parsedData.totalResults || 0);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ marginTop: "70px" }}>
        Quicknews : Top {Capitalize(props.category)} Headlines
      </h1>

      {loading && <Spiner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spiner />}
      >
        <div className="row">
          {articles.map((element, index) => {
            return (
              <div
                className="col-md-4"
                key={`${element.publishedAt}-${element.url}-${index}`}
              >
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source?.name}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

Newss.defaultProps = {
  country: "us",
  pageSize: 10,
  category: "general",
};

Newss.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};

export default Newss;