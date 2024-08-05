import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { schools } from "../../data/schools";
import styles from "./CreateForm.module.css";

interface FormData {
  title: string;
  description: string;
  school: string;
  contacts: number;
}

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
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost: SubmitHandler<FormData> = async (data) => {
    try {
      if (!user) {
        throw new Error("User is not authenticated");
      }

      const postData = {
        ...data,
        username: user.displayName,
        userId: user.uid,
      };

      console.log("Post Data: ", postData);

      await addDoc(postsRef, postData);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating post: ", error);
        alert("Error creating post: " + error.message);
      } else {
        console.error("Unexpected error: ", error);
        alert("An unexpected error occurred");
      }
    }
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
          placeholder="Your phone number..."
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
