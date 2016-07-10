import React from 'react';
import ReactDOM from 'react-dom';
import PostForm from './PostForm';

var postModel = {
    "id":"578196414a6e751cd4543351",
    "postTitle":"hARIS FIX",
    "postDate":1468110391363,
    "postContent":{"text":"<div>Z</div>","intro":"<div>a</div>"},
    "username":null,
    "images":["post_imagefile_1468110397433.jpeg","post_imagefile_1468110399217.jpeg"],
    "videos":[],
    "likedUsers":[],
    "comments":[]
}


ReactDOM.render(<PostForm  model={postModel}/>, document.getElementById('root'));
