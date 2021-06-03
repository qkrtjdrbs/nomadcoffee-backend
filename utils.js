import { createWriteStream } from "fs";

export const uploadFile = async (file, id) => {
  const { filename, createReadStream } = await file;
  const newFileName = `${id}-${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const writeStream = createWriteStream(
    process.cwd() + "/uploads/" + newFileName
  );
  readStream.pipe(writeStream);
  return `http://localhost:4000/static/${newFileName}`;
};
