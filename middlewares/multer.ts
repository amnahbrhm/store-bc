import multer from "multer"
 
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'uploads')
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ storage: storage })

export default upload