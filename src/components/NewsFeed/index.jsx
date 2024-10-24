import React, { useEffect, useState } from "react";
import './index.css';
import news_feed from "../../assets/news_feed.png";

const NewsFeed = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/cyanotracker/support_files_for_website/main/news_feed.json',{ cache: 'no-store'});
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                const data = await response.json();
                console.log(`news feed data`,data);
                setNews(data.newsfeed);
            }  catch (error) {
                console.error('Fetch error:', error);
                setError(error.message || 'Unknown error occurred');
              } finally {
                setLoading(false);
              }
        };

        fetchNews();
    }, []);

    return (
        <>
            <div className="NewsFeedOuter-container">
                <h2 className="newsmainHeading">News Feed</h2>
                <img id="news_feed_img" src={news_feed} alt="News Feed" />
                <ul id="news_feed_content">
                    {news.map((item, index) => (
                        <li key={index}>
                            <strong>{item.date}: </strong>
                            {item.content} at <a target="_blank" rel="noopener noreferrer" href={item.link}>{item.conference}</a>, {item.location}.
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default NewsFeed;
