import { loadModule } from 'cld3-asm';
import ISO6391 from 'iso-639-1';

export const detectLanguage = async (sentence: string) => {
  const cldFactory = await loadModule();
  const langId = cldFactory.create(0);

  try {
    const languageData = langId.findMostFrequentLanguages(
      JSON.stringify(sentence),
      1
    )[0];
    if (languageData) {
      const languageCode = languageData?.language;
      //// Convert language code to language name
      const languageName = ISO6391.getName(languageCode);
      return languageName;
    }
  } catch (error) {
    throw error;
  }
};
