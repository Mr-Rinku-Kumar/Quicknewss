import React from "react";

const NewsItem = (props) => {
    let { title, description, imgUrl, newsUrl, author, date, source} =props;
    return (
      <div className="my-3">
        <div className="card">
        <span className=" badge rounded-pill bg-danger" style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:"0"}}>
                {source}
              </span>
          <img
            src={
              imgUrl
                ? imgUrl
                : "https://static.toiimg.com/thumb/msid-113684569,width-1070,height-580,imgsize-685780,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"
            }
            className="card-img-top"
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
             
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">
              Read More..
            </a>
          </div>
        </div>
      </div>
    );
}
export default NewsItem; 
