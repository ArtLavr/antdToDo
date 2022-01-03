import React from 'react';
import Hashtag from '../hashtag';
import './index.scss';

function HashtagList(props) {
  return (
    <div className='hashtags'>
      {console.log(props.allHashtags)}
      {props.allHashtags.map((hashtag) => (
        <Hashtag hashtag={hashtag} />
      ))}
    </div>
  );
}

export default HashtagList;
