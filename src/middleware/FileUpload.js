// import multer from "multer"
// import { v4 as uuidv4 } from 'uuid';


// // dont forget to create folder called "uploads" and to use ==> app.use(static())
// // main function to upload file

// const fileUpload = () => {
//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, 'uploads')
//         },
//         filename: function (req, file, cb) {

//             cb(null, uuidv4() + "_" + file.originalname)
//         }
//     })
//     function fileFilter(req, file, cb) {

//         if (file.mimetype.startsWith("image")) {
//             cb(null, true)
//         } else {
//             cb(null, false)
//         }


//     }
//     const upload = multer({
//         storage, fileFilter, limits: {
//             fileSize: 1024 * 1024 * 1 //4MB
//         }
//     })
//     return upload
// }


// // upload sinle files
// export const uploadSingleFile = fieldName => fileUpload().single(fieldName)

// //  uppload array of files 
// export const uploadMixOfFiles = (fieldName, maxCount) =>
//      fileUpload().array(fieldName, maxCount)