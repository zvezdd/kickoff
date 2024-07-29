import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Post from "./Post";
import styles from "./Home.module.css";
import Loader from "../../components/Loader";

export default function Home() {
  const [postsList, setPostsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const data = await getDocs(collection(db, "posts"));
        setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error getting documents: ", error);
      } finally {
        setLoading(false);
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        getPosts();
      } else {
        console.log("User is not authenticated");
        setLoading(false);
      }
    });
  }, [auth]);

  return (
    <div className={styles.home}>
      <h1>Find Teams</h1>
      {loading ? (
        <Loader />
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
