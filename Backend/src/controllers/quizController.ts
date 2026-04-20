import { Request, Response } from 'express';
import { saveQuizAnswers } from '../services/firebaseService.js';

export const submitQuiz = async (req: Request, res: Response): Promise<void> => {
    try {
        // Make sure the user is logged in
        const uid = req.firebaseUser?.uid;
        if (!uid) {
            res.status(401).json({ code: "UNAUTHORIZED", message: "No user context" });
            return;
        }

        // Pull the answers out of the request body
        const {
            age,
            gender,
            height,
            weight,
            countryOfOrigin,
            allergies,
            currentPrescription,
            medHistory
        } = req.body;

        // Basic validation - make sure nothing is missing
        if (!age || !gender || !height || !weight || !countryOfOrigin) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        // Send to the service (kitchen) to save
        await saveQuizAnswers(uid, {
            age,
            gender,
            height,
            weight,
            countryOfOrigin,
            allergies: allergies ?? '',
            currentPrescription: currentPrescription ?? '',
            medHistory: medHistory ?? ''
        });

        res.status(201).json({ message: "Quiz submitted successfully" });

    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
};