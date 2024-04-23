import { LanguageCode } from "@/redux/slices/languageSlice";
import { decodeHtmlEntity } from "@/utils";
import axios, { AxiosResponse } from "axios";

type Text = {
  key: string;
  content: string[];
};

const googleTranslateApi = axios.create({
  baseURL: "https://translation.googleapis.com/",
});

type Translated = {
  translatedText: string;
  detectedSourceLanguage: string;
};

type TranslateResponse = {
  data: {
    translations: Translated[];
  };
};

type ContentLengthMap = {
  key: string;
  startIndex: number;
  endIndex: number;
};

export async function tryToTranslate(
  texts: Text[],
  fromLanguageCode: LanguageCode,
  toLanguageCode: LanguageCode
): Promise<Text[]> {
  let lastPosition = 0;
  const contentLengthMap: ContentLengthMap[] = texts.map((text) => {
    const startPosition = lastPosition;
    lastPosition += text.content.length;
    return {
      key: text.key,
      startIndex: startPosition,
      endIndex: lastPosition,
    };
  });

  const toTranslate = texts.reduce(
    (acc: string[], text) => [...acc, ...text.content],
    []
  );

  try {
    const response: AxiosResponse<TranslateResponse> =
      await googleTranslateApi.post(
        `language/translate/v2?key=${import.meta.env.VITE_PROJECT_KEY}`,
        {
          q: toTranslate,
          source: fromLanguageCode,
          target: toLanguageCode,
        }
      );

    const translations = response.data.data.translations;

    const formattedTranslation: Text[] = contentLengthMap.map((element) => {
      return {
        key: element.key,
        content: translations
          .slice(element.startIndex, element.endIndex)
          .map((t) => decodeHtmlEntity(t.translatedText)),
      };
    });

    return formattedTranslation;
  } catch (error) {
    return texts;
  }
}
