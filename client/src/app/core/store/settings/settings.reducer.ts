import * as actions from './settings.actions';

export interface State {
  isMobileView: boolean;
  isTabletView: boolean;
  isMobileMenuOpen: boolean;
  isLightTheme: boolean;
  isSettingsOpen: boolean;
  isMenuTop: boolean;
  isMenuCollapsed: boolean;
  isBorderless: boolean;
  isSquaredBorders: boolean;
  isFixedWidth: boolean;
  isMenuShadow: boolean
};

const STORED_SETTINGS = (storedSettings: State): State => {
  const settings = {};
  Object.keys(storedSettings).forEach(key => {
    const item = JSON.parse(localStorage.getItem(`app.settings.${key}`));
    settings[key] = item === null ? storedSettings[key] : item;
  });
  return <State>settings;
}

export const initialState: State = {
  // default settings, if not exist in localStorage
  ...STORED_SETTINGS({
    isMobileView: false,
    isTabletView: false,
    isMobileMenuOpen: false,
    isLightTheme: true,
    isSettingsOpen: false,
    isMenuTop: false,
    isMenuCollapsed: false,
    isBorderless: true,
    isSquaredBorders: false,
    isFixedWidth: false,
    isMenuShadow: true
  })
}

export function reducer(state: State = initialState, { type, payload } ): State {
  switch (type) {
    case actions.SET_STATE:
      const key = Object.keys(payload)[0];
      window.localStorage.setItem(`app.settings.${key}`, payload[key]);
      return { ...state, ...payload };
    default:
      return state;
  }
}
