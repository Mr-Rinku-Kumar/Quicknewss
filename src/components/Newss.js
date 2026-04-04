import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";
import InfiniteScroll from "react-infinite-scroll-component";

const Newss = ({
  country = "us",
  pageSize = 10,
  category = "general",
  setProgress,
}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  // 🔥 ENV based URL
  const getUrl = (pageNo) => {
    if (process.env.NODE_ENV === "development") {
      // 👉 Local (direct API)
      return `https://gnews.io/api/v4/top-headlines?country=${country}&category=${category}&apikey=${process.env.REACT_APP_API_KEY}&max=${pageSize}&page=${pageNo}`;
    } else {
      // 👉 Vercel (backend proxy)
      return `/api/news?category=${category}&page=${pageNo}`;
    }
  };

  const updateNews = async () => {
    try {
      setProgress && setProgress(10);
      setLoading(true);

      const url = getUrl(page);

      setProgress && setProgress(30);

      let res = await fetch(url);

      // 🔥 ERROR HANDLING (important)
      if (!res.ok) {
        throw new Error("API response not OK");
      }

      let data = await res.json();

      setArticles(data.articles || []);
      setLoading(false);

      setProgress && setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${capitalize(category)} - QuickNews`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      setPage(nextPage);

      const url = getUrl(nextPage);

      let res = await fetch(url);

      if (!res.ok) {
        throw new Error("API response not OK");
      }

      let data = await res.json();

      setArticles((prev) => prev.concat(data.articles || []));
    } catch (error) {
      console.error("Error loading more news:", error);
    }
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ marginTop: "70px" }}>
        QuickNews : Top {capitalize(category)} Headlines
      </h1>

      {loading && <Spiner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Spiner />}
      >
        <div className="row">
          {articles.map((element, index) => (
            <div className="col-md-4" key={index}>
              <NewsItem
                title={element.title}
                description={element.description}
                imgUrl={element.image}
                newsUrl={element.url}
                author={element.source?.name}
                date={element.publishedAt}
                source={element.source?.name}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Newss;