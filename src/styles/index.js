import { StyleSheet } from 'react-native';
import * as globalStyleVariables from './variables';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: globalStyleVariables.HEADER_BACKGROUND_COLOR,
  },
  headerWithoutShadow: {
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
    },
    elevation: 0,
    backgroundColor: globalStyleVariables.HEADER_BACKGROUND_COLOR,
  },
  scrollView: {
    height: globalStyleVariables.WINDOW_HEIGHT - globalStyleVariables.APPBAR_HEIGHT - globalStyleVariables.STATUSBAR_HEIGHT + 1,
    backgroundColor: '#fff',
  },
});

export { globalStyles, globalStyleVariables };
