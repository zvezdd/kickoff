import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from './postsSlice';

const AddPost = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost({ content }));
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
      />
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPost;
