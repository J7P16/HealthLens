import express from 'express';
import multer from 'multer';
import { verifyFirebaseAuth } from '../middleware/verifyFirebaseAuth.js';
import { uploadImage, getUser, getResult, getSources } from '../controllers/apiController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', verifyFirebaseAuth, upload.single('image'), uploadImage);
router.get('/user', verifyFirebaseAuth, getUser);
router.get('/result/:imageId', verifyFirebaseAuth, getResult);
router.get('/result/:imageId/sources', verifyFirebaseAuth, getSources);

export default router;


