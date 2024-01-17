import React from 'react';
import './index.css';
import { Tweet } from 'react-tweet';

const ReactTweet = ({tweets}) => {
  return (
    <div class="tweet">
      {/* Other components or content can go here */}
      {tweets.map(tweetId =>(<Tweet  key={tweetId} id={tweetId} />))}
      
      
      {/* Additional content or components */}
    </div>
  );
}

export default ReactTweet