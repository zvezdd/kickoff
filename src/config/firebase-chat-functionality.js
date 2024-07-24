import { addDoc, collection, doc, getDoc, setDoc, updateDoc, arrayUnion, getDocs, query, where } from "firebase/firestore"
import { db, auth } from "./firebase-config"

const createOrGetChat = async (authorId) => {
    const userId = auth.currentUser.uid

    const chatsRef = collection(db, "chats")
    const q = query(chatsRef, where("participants", "array-contains", userId));
    const querySnapshot = await getDocs(q)
    let chatId = null;
    querySnapshot.forEach((doc) => {
        if(doc.data().participants.includes(authorId)){
            chatId = doc.id;
        }
    });

      if(!chatId) {
        const chatDocRef = await addDoc(collection(db, "chats"), {
            participants: [userId,, authorId],
        })
        chatId = chatDocRef.id
      }
      return chatId
}

const sendMessage = async (chatId, message) => {
    await addDoc(collection(db, "chats", chatId, "messages"), {
      sender: auth.currentUser.uid,
      text: message,
      timestamp: new Date(),
    });
  };