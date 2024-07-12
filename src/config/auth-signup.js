import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app)

createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    user = userCredential.user
})
.catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
})
