import express from 'express';
import multer , { MulterRequest } from 'multer';
import path from 'path';
const router = express.Router();

// Configure multer and define storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    console.log("get image: " + imageName);
    const imagePath = path.join('/home/st111/LuckyTicket_Server/uploads', imageName);
    res.sendFile(imagePath);
  });
  

router.post('/upload', upload.single('image'), (req : MulterRequest, res) => {
  try {
    const file = req.file;
    if (!file) {
      throw new Error('Please upload a file');
    }
    console.log("file destination: " +file.destination);
    res.status(200).send(file.filename);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
