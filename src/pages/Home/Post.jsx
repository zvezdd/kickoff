import React from 'react';
import styles from './Post.module.css';
import { createOrGetChat } from '../../config/firebase-chat-functionality';
import { useNavigate } from 'react-router-dom';

export default function Post({ post }) {
  const navigate = useNavigate();

  const handlePostClick = async () => {
    try {
      if (!post.userId) {
        console.error("Author ID is missing in the post data:", post);
        return;
      }

      console.log("Creating or getting chat for author ID:", post.userId);

      const chatId = await createOrGetChat(post.userId);

      if (!chatId) {
        console.error("Failed to create or retrieve chat ID.");
        return;
      }

      navigate(`/chat/${chatId}`);
    } catch (error) {
      console.error("Error handling post nothing:", error);
    }
  };

  return (
    <div onClick={handlePostClick} className={styles.post}>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <p className={styles.postDescription}>{post.description}</p>
      <p className={styles.postSchool}><strong>School: </strong>{post.school}</p>
      <p className={styles.postContacts}><strong>Contacts: </strong>{post.contacts}</p>
      <div className={styles.postFooter}>
        <span className={styles.postAuthor}><strong>Author: </strong>{post.username}</span>
      </div>
    </div>
  );
}
