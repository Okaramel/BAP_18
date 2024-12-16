import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/images/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Le fichier doit être une image"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

export default upload;
