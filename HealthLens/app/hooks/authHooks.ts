import {
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { db } from "../config/firebaseConfig";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { RelativePathString, router } from "expo-router";
import { useEffect, useState } from "react";

// User interface for Firestore user documents, can be expanded with additional fields as needed
export interface User {
  email: string;
  age: number;
  allergies: string[];
  countryOfOrigin: string;
  createdAt: any;
  currentPrescription: any;
  gender: string;
  height: number;
  medHistory: any;
  name: string;
}

/*
    This file is meant to centralize all authentication-related logic, 
    such as signing in with Google, signing out, and checking if a user is authenticated. 

    For Frontend -> call useAuth at the beginning of the sign-in screen component, 
    passing in the path to redirect to after successful authentication.
    It should redirect if the user's login is cached. Else use the returned hooks to sign in 
    with the respective method.
    Loading is to disable buttons while the sign-in process is happening, 
    and error can be used to display any errors that occur during sign-in. Check out native popups or toasts for a better user experience.

    @param redirect - the path to redirect to after successful authentication
    @returns an object with methods for signing in and out, as well as loading and error states.
*/
export const useAuth = (redirect: String) => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push(redirect as RelativePathString);
      }
    });

    return () => unsubscribe();
  }, []); // runs once on mount

  const createUserInFirestore = async (user: any) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // if user doesn't exist in Firestore, create a new document for them with default fields only
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          createdAt: serverTimestamp(),
        });
      }

      router.push(redirect as RelativePathString);
    }
  };

  // Sign in with email and password must pass in email and password as parameters
  const signInWithPassword = async (email: string, password: string) => {
    setLoading(true);

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await createUserInFirestore(user);
      })
      .catch((error) => {
        setError(error.message || "An error occurred during sign-in.");
      });

    setLoading(false);
  };

  const createAccount = async (email: string, password: string, confirmPassword: string) => {
    setLoading(true);

    if (!email || !password || !confirmPassword) {
      setError("Email, password, and confirm password are required.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        await createUserInFirestore(user);
        // ...
      })
      .catch((error) => {
        setError(error.message || "An error occurred during account creation.");
      });

    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider) // Switch to signInWithRedirect if you want to support mobile browsers that block popups
      .then(async (result) => {
        const user = result.user;
        await createUserInFirestore(user);
      })
      .catch((error) => {
        setError(error.message || "An error occurred during Google sign-in.");
      });

    setLoading(false);
  };

  const signOutHook = async () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        setError(error.message || "An error occurred during sign-out.");
      });

    setLoading(false);
  };

  /* Placeholder for setting additional account info after sign-up, such as age, allergies, etc.
    can be used as a generic setter for any fields in the User interface, but for better type safety and developer experience,
    @param any null fields will be ignored and not updated in Firestore
  */
  const setAccountInfo = async (userData: User) => {
    // Implementation placeholder
    if (!auth.currentUser) {
      setError("User not authenticated.");
      return;
    }

    const userRef = doc(db, "users", auth.currentUser.uid);
    await setDoc(userRef, userData, { merge: true });
  };

  return { createAccount, signInWithPassword, signInWithGoogle, signOutHook, loading, error };
};
