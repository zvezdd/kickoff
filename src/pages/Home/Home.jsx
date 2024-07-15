import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import Post from "./Post";
import styles from "./Home.module.css";

export default function Home() {
  const [postsList, setPostsList] = useState([]);
  const postsRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsRef);
      setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  return (
    <div className={styles.home}>
      <h1>Home</h1>
      <div className={styles.postsList}>
        {postsList.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
