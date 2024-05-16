import { Text } from "../googleTranslateApi";

export const tryToTranslate = async (texts: Text[]) => {
  return new Promise((resolve) => resolve(texts));
};
