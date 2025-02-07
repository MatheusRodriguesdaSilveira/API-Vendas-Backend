import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

const storage = multer.diskStorage({
  destination: uploadFolder,
  filename(request, file, callback) {
    const fileHash = crypto.randomBytes(10).toString('hex');

    const fileName = `${fileHash}-${file.originalname}`;

    console.log(fileName);

    callback(null, fileName);
  },
});

export default {
  directory: uploadFolder,
  storage: storage,
};
