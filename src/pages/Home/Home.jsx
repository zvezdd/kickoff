import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import Post from "./Post";
import styles from "./Home.module.css";
import Loader from "../../components/Loader";

export default function Home() {
  const [postsList, setPostsList] = useState([]);
  const postsRef = collection(db, "posts");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true)
      const data = await getDocs(postsRef);
      setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false)
    };
    getPosts();
  }, []);

  return (
    <div className={styles.home}>
    <h1>Find Teams</h1>
    {loading ? (
      <Loader/>
    ) : (
      <div className={styles.postsList}>
        {postsList.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    )}
  </div>
  );
}
