import React, { useEffect, useState } from 'react'
import './Home.css'
import { db } from '../config/firebase-config'
import { collection, getDocs } from 'firebase/firestore'

export default function Home({user}) {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsArray);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
};
