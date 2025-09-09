import React, { useEffect, useState, useRef } from "react";
import './index.css';
import news_feed from "../../assets/news_feed.png";

const AUTOPLAY_MS = 5000;
const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const hoverRef = useRef(false);


  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/cyanotracker/support_files_for_website/main/news_feed_test.json', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`news feed data`, data);
        setNews(data.newsfeed);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const goTo = (i) => setIndex((i + news.length) % news.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (!news.length) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!hoverRef.current) setIndex((i) => (i + 1) % news.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [news.length]);

  return (
    <>
      <div
        className="NewsFeedOuter-container"
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
        aria-label="News Feed Carousel"
      >
        <div className="newsfeed-header">
          <h2 className="newsmainHeading">News Feed</h2>
          <img id="news_feed_img" src={news_feed} alt="News Feed" />
        </div>

        <div className="carousel-window">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {news.map((item, i) => (
              <article className="news-card" key={i}>
                <img className="news-img" src={item.image} alt={item.conference} />
                <div className="news-body">
                  <p className="news-date">{item.date}</p>
                  <p className="news-text">
                    {item.content} at{" "}
                    <a target="_blank" rel="noopener noreferrer" href={item.link}>
                      {item.conference}
                    </a>
                    =, {item.location}.
                  </p>
                </div>
              </article>
            ))}
          </div>
          <button className="nav prev" onClick={prev} aria-label="Previous">‹</button>
          <button className="nav next" onClick={next} aria-label="Next">›</button>
        </div>

        <div className="dots">
          {news.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );

};

export default NewsFeed;
