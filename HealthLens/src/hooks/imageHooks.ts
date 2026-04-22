import { getAuth } from "firebase/auth";
import { db, storage } from "../../app/config/firebaseConfig";
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Returns an array of image URIs for the authenticated user, or throws an error if the user is not authenticated
export const getUserImages = async (userId: string) => {
  if (!userId) {
    throw new Error("User not authenticated");
  }

  console.log(userId);

  console.log("Getting document");
  const imagesSnapshot = await getDocs(collection(db, "users", userId, "images"));
  console.log("Got Documents");

  return imagesSnapshot.docs.map((doc) => ({
    id: doc.id,
    uri: doc.data().imageUri,
    createdAt: doc.data().createdAt,
  }));
};

// Posts a new image URI to the authenticated user's Firestore document, or throws an error if the user is not authenticated
// Images are stored at /users/{userId}/images/{imageId} with fields { imageUri: string, createdAt: timestamp }
// @param imageUri the URI of the cached image to be stored in Firestore
export const uploadUserImage = async (userId: string, imageUri: string) => {
  if (!userId) throw new Error("User not authenticated");
  if (!imageUri) return null;

  const response = await fetch(imageUri);
  const blob = await response.blob();

  const storageRef = ref(storage, `images/${userId}/${Date.now()}.jpg`);

  await uploadBytes(storageRef, blob);

  const downloadURL = await getDownloadURL(storageRef);

  const docRef = await addDoc(collection(db, "users", userId, "images"), {
    imageUri: downloadURL,
    createdAt: serverTimestamp(),
  });

  return {
    downloadURL,
    storagePath: storageRef.fullPath,
    docId: docRef.id,
  };
};

export const uploadAndDiagnose = async (userId: string, imageUri: string) => {
  const uploadResult = await uploadUserImage(userId, imageUri);

  if (!uploadResult) throw new Error("Upload failed");

  console.log("📤 Uploaded:", uploadResult.storagePath);

  const response = await fetch("http://10.148.181.198:3000/api/diagnose", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firebasePath: uploadResult.storagePath,
    }),
  });

  if (!response.ok) {
    throw new Error("Backend failed");
  }

  const result = await response.json();

  console.log("🧠 Diagnosis:", result);

  return {
    upload: uploadResult,
    diagnosis: result,
  };
};