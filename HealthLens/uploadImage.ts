import { storage, db } from "./app/config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

export const uploadImageToFirebase = async (uri: string, userId: string) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();

        const filename = `${Date.now()}.jpg`;
        const storagePath = `images/${userId}/${filename}`;
        const storageRef = ref(storage, storagePath);

        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);

        return {
            success: true,
            downloadURL,
            storagePath,
        };

    } catch (error) {
        console.error('Error uploading image:', error);
        return {
            success: false,
            error,
        };
    }
};

export const getImagesFromFirebase = async () => {
    try {
        const q = query(collection(db, 'diagnoses'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
};

export const uploadAndDiagnose = async (uri: string, userId: string) => {
    console.log("🔥 uploadAndDiagnose CALLED");
    const uploadResult = await uploadImageToFirebase(uri, userId);

    if (!uploadResult.success) return uploadResult;

    try {
        const response = await fetch("http://10.148.181.198:3000/api/diagnose", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firebasePath: uploadResult.storagePath,
                userId: userId,
            }),
        });

        const result = await response.json();

        return {
            success: true,
            downloadURL: uploadResult.downloadURL,
            storagePath: uploadResult.storagePath,
            diagnosis: result,
        };
    } catch (error) {
        console.error("Backend error:", error);
        return {
            success: false,
            error,
        };
    }
};