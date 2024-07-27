import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase-config";

export const createOrGetChat = async (authorId) => {
  const userId = auth.currentUser?.uid;
  if (!userId || !authorId) {
    console.error("User ID or Author ID is missing:", { userId, authorId });
    throw new Error("User ID or Author ID is missing");
  }

  const chatsRef = collection(db, "chats");
  const q = query(chatsRef, where("participants", "array-contains", userId));
  const querySnapshot = await getDocs(q);
  let chatId = null;

  querySnapshot.forEach((doc) => {
    if (doc.data().participants.includes(authorId)) {
      chatId = doc.id;
    }
  });

  if (!chatId) {
    const chatData = {
      participants: [userId, authorId],
    };

    console.log("Creating a new chat with data:", chatData);

    try {
      const chatDocRef = await addDoc(collection(db, "chats"), chatData);
      chatId = chatDocRef.id;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  }

  return chatId;
};
