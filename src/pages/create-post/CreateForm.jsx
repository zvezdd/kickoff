import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase-config"
import {useAuthState} from "react-firebase-hooks/auth"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { schools } from "../data/schools"; 
import styles from "./CreateForm.module.css"; 

const schema = yup.object().shape({
  title: yup.string().required("You must add a title"),
  description: yup.string().required("You must add a description"),
  school: yup.string().required("You must select a school"),
  contacts: yup.number().required("You must add your number")
});

export default function CreateForm() {

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts")

  const onCreatePost = async(data) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    })
    navigate("/")
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)} className={styles.form}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Title..."
          {...register("title")}
          className={styles.input}
        />
        <p className={styles.error}>{errors.title?.message}</p>
      </div>
      <div className={styles.inputGroup}>
        <textarea
          type="text"
          placeholder="Description..."
          {...register("description")}
          className={styles.textarea}
        />
        <p className={styles.error}>{errors.description?.message}</p>
      </div>
      <div className={styles.inputGroup}>
        <select {...register("school")} className={styles.select}>
          {schools.map((school, index) => (
            <option key={index} className={styles.option} value={school}>
              {school}
            </option>
          ))}
        </select>
        <p className={styles.error}>{errors.school?.message}</p>
      </div>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="your phone number..."
          {...register("contacts")}
          className={styles.input}
        />
        <p className={styles.error}>{errors.contacts?.message}</p>
      </div>
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
}
