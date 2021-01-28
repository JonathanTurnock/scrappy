import { extname } from "path";

export const localImages = (acceptableExtensions: string[]) => (request, callback) => {
  const fullPath = request.url.replace("file://", "");
  const fileExtension = extname(fullPath);
  if (acceptableExtensions.includes(fileExtension)) {
    callback({
      path: fullPath,
    });
  }
};
