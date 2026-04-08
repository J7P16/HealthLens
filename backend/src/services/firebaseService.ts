import admin from "firebase-admin";
import { DocumentData } from "firebase-admin/firestore";


/*Creating bussiness side logic where most of the API workload
will occur. Functions will be exported to then be used by Controllers that will
check req and res which will then be used for routes.
 */

export const saveImage = async (uid: string, file: Express.Multer.File): Promise<string> => {
    // Writing the actual image to Firebase Storage.
    const bucket = admin.storage().bucket();
    const fileRef = bucket.file(`users/${uid}/images/${crypto.randomUUID}`);
    await fileRef.save(file.buffer, {contentType: file.mimetype});

    //Writing the metadata of the image into firestore.
    const docRef = await admin.firestore()
        .collection('users')
        .doc(uid)
        .collection('images')
        .add({
            firePath: fileRef.name, // The link between the two.
            staus: 'pending',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    return docRef.id;
}

export const fetchUser = async(uid: string) => {
    // Pulling Doc from firestore.
    const doc = await admin.firestore()
        .collection('users')
        .doc(uid)
        .get();
    if (!doc.exists) return null;
    return {/*Need to process data but have to figure out schema first.*/};
}  


/* There is a lot more work to-do in this function as need to connect it 
    jeenies implmentation to connect to model.*/
export const fetchResult = async (imageId: string, uid:string): Promise<FirebaseFirestore.DocumentData> => {
    const doc = await admin.firestore()
        .collection('users')
        .doc(uid)
        .collection('images')
        .doc(imageId)
        .get();
        if (!doc.exists) throw new Error('Image not found.');
        return doc.data() as DocumentData;
}