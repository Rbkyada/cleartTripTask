import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';
import { en } from '@Localization/en';

export type Translation = typeof en;

const translations = {
  en,
};

export default new LocalizedStrings(translations);
