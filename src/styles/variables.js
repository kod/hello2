import { Dimensions, Platform } from 'react-native';

export const BACKGROUND_COLOR = '#f5f5f5';
export const HEADER_BACKGROUND_COLOR = '#fff';
export const HEADER_TINT_COLOR = '#fff';
export const PRIMARY_COLOR = '#147af2';
export const HIGHLIGHT_COLOR = 'green';

export const WINDOW_WIDTH = Math.floor(Dimensions.get('window').width);
export const WINDOW_HEIGHT = Math.floor(Dimensions.get('window').height);

export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 50;
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
// export const DRAWER_WIDTH =
//   WINDOW_WIDTH - (Platform.OS === 'android' ? 56 : 64);
