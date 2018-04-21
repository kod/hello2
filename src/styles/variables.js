import { Dimensions, Platform, StatusBar } from 'react-native';

export const BACKGROUND_COLOR = '#f5f5f5';
export const HEADER_BACKGROUND_COLOR = '#fff';
export const HEADER_TINT_COLOR = '#fff';
export const PRIMARY_COLOR = '#0076F7';
export const HIGHLIGHT_COLOR = 'green';

export const WINDOW_WIDTH = Math.floor(Dimensions.get('window').width);
export const WINDOW_HEIGHT = Math.floor(Dimensions.get('window').height);
export const SIDEINTERVAL = Math.floor(Dimensions.get('window').width) * 0.04;

export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 44;
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
// export const DRAWER_WIDTH =
//   WINDOW_WIDTH - (Platform.OS === 'android' ? 56 : 64);
