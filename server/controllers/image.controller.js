// export const postImage = async (req, res) => {
//   try {
//     console.log(req.files);
//     const { image } = req.files;
//     const filename = Date.now() + image.name.replace(/\s/g, "");
//     const url = `${req.protocol}://${req.get("host")}/uploads/${filename}`;

//     await image.mv("uploads/" + filename, function (err) {
//       if (err) {
//         throw err;
//       }
//     });
//     return res.status(200).json({
//       url,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       error: error,
//       message: "unable to upload image",
//     });
//   }
// };
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const postImage = async (req, res) => {
  try {
    const { image } = req.files;

    const uploadsDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    const filename = Date.now() + image.name.replace(/\s/g, "");
    const filePath = path.join(uploadsDir, filename);
    const url = "";

    await image.mv(filePath, function (err) {
      if (err) {
        throw err;
      }
    });

    return res.status(200).json({
      url,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Unable to upload image",
    });
  }
};
