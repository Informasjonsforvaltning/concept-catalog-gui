import { SET_INPUT_LANGUAGES, TOGGLE_INPUT_LANGUAGE } from './actionTypes';
import { localization } from '../../../lib/localization';
import { Language } from '../../../types';

const NB = 'nb';
const NN = 'nn';
const EN = 'en';

interface LanguageState {
  languages: Language[];
}

export const initialState: LanguageState = {
  languages: [
    {
      code: NB,
      title: localization.NO_NB,
      selected: true
    },
    {
      code: NN,
      title: localization.NO_NN,
      selected: false
    },
    {
      code: EN,
      title: localization.ENG,
      selected: false
    }
  ]
};

export const languagePickerReducer = (
  state = initialState,
  action
): LanguageState => {
  switch (action.type) {
    case SET_INPUT_LANGUAGES: {
      const allowedLanguages = state.languages.map(({ code }) => code);
      const inputLanguages = action.payload.languages.filter(lang =>
        allowedLanguages.includes(lang)
      );

      return {
        ...state,
        languages: inputLanguages.length
          ? state.languages.map(({ code, title }) => ({
              code,
              title,
              selected: inputLanguages.includes(code)
            }))
          : initialState.languages
      };
    }
    case TOGGLE_INPUT_LANGUAGE: {
      return {
        ...state,
        languages: state.languages.map(({ code, title, selected }) => ({
          code,
          title,
          selected: code === action.payload.language ? !selected : selected
        }))
      };
    }
    default: {
      return state;
    }
  }
};
