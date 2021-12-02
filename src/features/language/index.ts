import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language } from '../../types';
import { localization } from '../../lib/localization';
import { LanguageCode } from '../../types/enums';

interface LanguageState {
  entities: Language[];
}

const initialState = {
  entities: [
    {
      code: LanguageCode.NB,
      title: localization.NO_NB,
      selected: true
    },
    {
      code: LanguageCode.NN,
      title: localization.NO_NN,
      selected: false
    },
    {
      code: LanguageCode.EN,
      title: localization.ENG,
      selected: false
    }
  ]
} as LanguageState;

const languageSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string[]>) {
      const allowedLanguages = state.entities.map(({ code }) => code);
      const inputLanguages = action.payload
        .filter(language => allowedLanguages.includes(language))
        .map(language => language);

      return {
        ...state,
        entities: inputLanguages.length
          ? state.entities.map(({ code, title }) => ({
              code,
              title,
              selected: inputLanguages.includes(code)
            }))
          : initialState.entities
      };
    },
    toggleLanguage(state, action: PayloadAction<string>) {
      return {
        ...state,
        entities: state.entities.map(({ code, title, selected }) => ({
          code,
          title,
          selected: code === action.payload ? !selected : selected
        }))
      };
    }
  }
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export const { reducer: languageReducer } = languageSlice;
