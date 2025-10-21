import React from 'react';
import './index.css';
import { useState, useEffect, useRef } from 'react';
import { Tweet } from 'react-tweet';

const ReactTweet = ({ tweets }) => {
  const [currentTweetindex, setTweetindex] = useState(0);
  const tweetsRef = useRef(tweets);

  useEffect(() => {
    tweetsRef.current = tweets; // always keep the latest tweets list
    setTweetindex(0); // optional: reset index if tweet list changes
  }, [tweets]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTweetindex(prevIndex => (prevIndex + 1) % tweetsRef.current.length);
    }, 4000); // Change tweet every 4 secs. 4000 milli seconds..

    return () => clearInterval(interval);
  }, [tweets]);




  return (
    <div>
      <h2 className="tweet-heading">Recent Tweets</h2>
      <div className="tweet">
        {tweets.length > 0 && (
          <Tweet key={tweets[currentTweetindex]} id={tweets[currentTweetindex]} />
        )}
      </div>
    </div>
  );
}

export default ReactTweet