import React, {useState} from 'react'
import { auth } from '../config/firebase-config'
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try{
            const userCredentical = await createUserWithEmailAndPassword(auth, email, password);

        }
        catch(error){
           setError(error.message)     
        }
    };

  return (
    <div>
    <h2>Sign Up</h2>
    <form onSubmit={handleSignUp}>
      <input
        type="email"
        placeholder="name"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
    {error && <p>{error}</p>}
  </div>
  )
}
