import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { db } from "../../app/config/firebaseConfig";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { RelativePathString, router } from "expo-router";
import { useEffect, useState } from "react";

// Firestore user profile document
export interface UserProfile {
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
  }, []);

  const createUserInFirestore = async (user: FirebaseUser) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

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

  const createAccount = async (email: string, password: string, confirmPassword: string, name: string) => {
    setLoading(true);

    if (!email || !password || !confirmPassword || !name) {
      setError("All fields are required.");
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
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          name: name,
          createdAt: serverTimestamp(),
        });
        router.push(redirect as RelativePathString);
      })
      .catch((error) => {
        setError(error.message || "An error occurred during account creation.");
      });

    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
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
      .then(() => {})
      .catch((error) => {
        setError(error.message || "An error occurred during sign-out.");
      });

    setLoading(false);
  };

  const setAccountInfo = async (userData: UserProfile) => {
    if (!auth.currentUser) {
      setError("User not authenticated.");
      return;
    }

    const userRef = doc(db, "users", auth.currentUser.uid);
    await setDoc(userRef, userData, { merge: true });
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    if (!email) {
      setError("Email is required.");
      setLoading(false);
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        router.push(redirect as RelativePathString);
      })
      .catch((error) => {
        setError(error.message || "An error occurred sending the reset email.");
      });
    setLoading(false);
  };

  const resetPassword = async (code: string, newPassword: string, confirmPassword: string) => {
    setLoading(true);
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    confirmPasswordReset(auth, code, newPassword)
      .then(() => {
        router.push(redirect as RelativePathString);
      })
      .catch((error) => {
        setError(error.message || "An error occurred resetting your password.");
      });
    setLoading(false);
  };

  return {
    createAccount,
    signInWithPassword,
    signInWithGoogle,
    signOutHook,
    forgotPassword,
    resetPassword,
    setAccountInfo,
    loading,
    error,
  };
};

export const useUser = () => {
  const auth = getAuth();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setProfile(userSnap.data() as UserProfile)
        }
      } else {
        setUser(null);
        setDisplayName(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, profile, loading };
};
