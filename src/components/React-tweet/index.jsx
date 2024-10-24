import React from 'react';
import './index.css';
import { useState,useEffect } from 'react';
import { Tweet } from 'react-tweet';

const ReactTweet = ({tweets}) => {
  tweets=tweets.slice(0,3); // Slicing the Top 3 tweets
  const [currentTweetindex,setTweetindex]=useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTweetindex(prevIndex => (prevIndex + 1) % tweets.length);
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