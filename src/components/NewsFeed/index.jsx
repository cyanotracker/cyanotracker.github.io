import React from "react";
import './index.css';
import news_feed from "../../assets/news_feed.png";

const NewsFeed=()=>{
    return(
        <>
        <div className="NewsFeedOuter-container">
        <h2 className="newsmainHeading">News Feed</h2>
        <img id="news_feed_img" src={news_feed}></img>
       <ul id="news_feed_content">
        <li> <strong>July 7-12, 2024: </strong> We will be presenting a paper: "Enhancing CyanoHAB Monitoring Across Multi-Satellite Sensors: Combining Empirical Phycocyanin Algorithms using Machine Learning" at <a target="_blank" href="https://www.2024.ieeeigarss.org/"> IEEE International Geoscience and Remote Sensing Symposium 2024 </a> in Athens, Greece.</li>
        <li> <strong> May 6-10, 2024:</strong> We will be presenting a poster: "Advancing Remote Sensing of CyanoHABs - Phycocyanin Estimation using Hyperspectral Inversion and Machine Learning" at <a href=" https://cce.nasa.gov/biodiversity/meeting_2024/index.html"> NASA's Biodiversity and Ecological Forecasting Annual Meeting 2024 </a> in Silver Spring, MD.</li>

        </ul>

        </div>
        </>
    )
}

export default NewsFeed;