import { SET_INPUT_LANGUAGES, TOGGLE_INPUT_LANGUAGE } from './actionTypes';

export function setInputLanguages(languages: string[]) {
  return {
    type: SET_INPUT_LANGUAGES,
    payload: {
      languages
    }
  };
}

export function toggleInputLanguage(language) {
  return {
    type: TOGGLE_INPUT_LANGUAGE,
    payload: {
      language
    }
  };
}
