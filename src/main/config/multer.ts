import multer from "multer";
import path from "path";

const uploadLocation = path.resolve("./uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadLocation);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export const multerUpload = upload.single("file");
