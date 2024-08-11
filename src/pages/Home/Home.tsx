import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setSchoolFilter } from "../../redux/slices/postFilterSlice";
import Post from "./Post";
import styles from "./Home.module.css";
import Loader from "../../components/Loader";
import { schools } from '../../data/schools';  // Import the schools list
import { RootState } from "../../redux/store"; // Import RootState

interface PostData {
  id: string;
  title: string;
  description: string;
  contacts: number
  school: string;
  username: string;
}

export default function Home() {
  const [postsList, setPostsList] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.postFilter);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const data = await getDocs(collection(db, "posts"));
        const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as PostData));
        setPostsList(posts);
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

  // Apply filters to the postsList based on the selected school
  const filteredPosts = postsList.filter((post) => {
    return filters.school ? post.school === filters.school : true;
  });

  return (
    <div className={styles.home}>
      <h1>Find Teams</h1>

      {/* Filter UI */}
      <div className={styles.filters}>
        {schools.length === 0 ? (
          <p className={styles.noSchoolsMessage}>No schools available</p>
        ) : (
          <select
            value={filters.school}
            onChange={(e) => dispatch(setSchoolFilter(e.target.value))}
          >
            <option value="">All Schools</option>
            {schools.map((school, index) => (
              <option key={index} value={school}>
                {school}
              </option>
            ))}
          </select>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className={styles.postsList}>
          {filteredPosts.length === 0 ? (
            <p className={styles.noPostsMessage}>No posts available</p>
          ) : (
            filteredPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
