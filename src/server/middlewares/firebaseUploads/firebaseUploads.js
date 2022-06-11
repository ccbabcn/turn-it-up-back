const debug = require("debug")("turnitup:middlewares:firebaseUploads");
const chalk = require("chalk");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const fs = require("fs");
const path = require("path");
const { initializeApp } = require("firebase/app");

const firebaseUploads = async (req, res, next) => {
  const { file } = req;
  const firebaseConfig = {
    apiKey: "AIzaSyDBB9O0BdfP4SoOYCcS1t7OeVFQ8bsv_IE",
    authDomain: "turn-it-up-ae5a3.firebaseapp.com",
    projectId: "turn-it-up-ae5a3",
    storageBucket: "turn-it-up-ae5a3.appspot.com",
    messagingSenderId: "194753255592",
    appId: "1:194753255592:web:27bb40acddbad620b5ca9d",
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const newFileName = file ? `${Date.now()}${file.originalname}` : "";

  if (file) {
    await fs.rename(
      path.join("uploads", "images", file.filename),
      path.join("uploads", "images", newFileName),
      async (error) => {
        if (error) {
          debug(chalk.red("Error renaming image of project"));

          next(error);
          return;
        }

        await fs.readFile(
          path.join("uploads", "images", newFileName),
          async (readError, readFile) => {
            if (readError) {
              debug(chalk.red("Error reading image of project"));

              next(readError);
              return;
            }

            const storage = getStorage(firebaseApp);

            const storageRef = ref(storage, newFileName);

            await uploadBytes(storageRef, readFile);

            const firebaseImageURL = await getDownloadURL(storageRef);

            req.imagebackup = firebaseImageURL;
            req.image = path.join("images", newFileName);

            next();
          }
        );
      }
    );
  } else {
    next();
  }
};

module.exports = firebaseUploads;
