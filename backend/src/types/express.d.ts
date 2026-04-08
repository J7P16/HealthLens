import type { DecodedIdToken } from "firebase-admin/auth";
import 'multer';
declare global {
  namespace Express {
    interface Request {
      firebaseUser?: DecodedIdToken;
    }
  }
}

export {};
