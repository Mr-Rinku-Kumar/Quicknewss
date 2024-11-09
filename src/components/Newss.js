import React, { useState,useEffect } from "react";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const Newss =(props)=>{ 
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const Capitalize=(str)=> {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const updateNews= async()=>{
    props.setProgress(10);
    let url = ` https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b5f54c1ea06c49a59643686ce2d6eec1&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    props.setProgress(20);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }

  useEffect(() => {
  document.title = `${Capitalize(props.category)}-QuickNews`;
    updateNews()
// eslint-disable-next-line 
  }, [])
  

   const fetchMoreData = async() =>  {
     let url = ` https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b5f54c1ea06c49a59643686ce2d6eec1&page=${page+1}&pageSize=${props.pageSize}`;
     setPage(page+1) 
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat (parsedData.articles))
    setTotalResults(parsedData.totalResults)
    
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
                <div className="col-md-4" key={`${element.publishedAt}-${element.url}-${index}`}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    publishdate={element.publishedAt}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  
} 
Newss.defaultProps = {
  country: "us",
  pageSize: 10,
  category: "general",
}
Newss.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
}

export default Newss;