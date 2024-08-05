import React from 'react';
import styles from './Post.module.css';

interface PostData {
  id: string;
  title: string;
  description: string;
  school: string;
  contacts: number;
  username: string;
}

interface Props {
  post: PostData;
}

const Post: React.FC<Props> = ({ post }) => {
  return (
    <div className={styles.post}>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <p className={styles.postDescription}>{post.description}</p>
      <p className={styles.postSchool}><strong>School: </strong>{post.school}</p>
      <p className={styles.postContacts}><strong>Contacts: </strong>{post.contacts}</p>
      <div className={styles.postFooter}>
        <span className={styles.postAuthor}><strong>Author: </strong>{post.username}</span>
      </div>
    </div>
  );
};

export default Post;
