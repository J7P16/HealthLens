import {Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { saveImage, fetchUser, fetchResult, fetchDiseaseSources} from '../services/firebaseService.js';
// I for see a future issue here as the path should .ts and not .js so will keep an eye on that.
import { error } from 'node:console';

interface ImageParams extends ParamsDictionary {
  imageId: string;
}

export const uploadImage =  async (req: Request, res: Response): Promise<void> => {
    try {
        const uid = req.firebaseUser?.uid;
        if (!uid) {
            res.status(401).json({ code: "UNAUTHORIZED", message: "No user context" });
            return;
        }
        if (!req.file) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }

        const imageId = await saveImage(uid, req.file);
        res.status(201).json({ imageId, status: 'pending' });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

export const getUser = async (req: Request, res: Response): Promise <void> => {
    try {
        if (!req.firebaseUser) {
            res.status(401).json({error : 'Unauthorized'});
            return;
        }
        const user = await fetchUser(req.firebaseUser.uid);
        if (!user){
            res.status(404).json ({error: 'User not found.'});
            return
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: (err as Error).message})
    }
}

// export const getResult = async (req: Request<ImageParams>, res: Response): Promise <void> => {
//     try {
//         if (!req.firebaseUser) {
//             res.status(401).json({ error: 'Unauthorized' });
//             return;
//         }
//         const data = await fetchResult(req.params.imageId, req.firebaseUser.uid);
//         if (data.status === 'pending') {
//             res.status(202).json({status: 'pending'});
//             return;
//         }
//         res.status(200).json({status: 'done', result: data.result});
//     } catch (err){
//         res.status(500).json({error: (err as Error).message });
//     }
// }

//This adds disease links to result

export const getResult = async (req: Request<ImageParams>, res: Response): Promise<void> => {
    try {
        if (!req.firebaseUser) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const data = await fetchResult(req.params.imageId, req.firebaseUser.uid);

        if (data.status === 'pending') {
            res.status(202).json({ status: 'pending' });
            return;
        }

        let sources: string[] = [];
        if (data.result?.class_name) {
            sources = await fetchDiseaseSources(data.result.class_name);
        }

        res.status(200).json({ status: 'done', result: data.result, sources });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};

//This gets just disease links 

export const getSources = async (req: Request<ImageParams>, res: Response): Promise<void> => {
    try {
        if (!req.firebaseUser) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        const data = await fetchResult(req.params.imageId, req.firebaseUser.uid);

        if (!data.result?.class_name) {
            res.status(404).json({ error: 'No diagnosis found for this image yet.' });
            return;
        }

        const sources = await fetchDiseaseSources(data.result.class_name);
        res.status(200).json({ class_name: data.result.class_name, sources });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};