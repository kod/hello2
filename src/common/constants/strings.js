import { IS_I18N } from './index';
import en from './strings/en.json';
import vi from './strings/vi.json';
import zh from './strings/zh.json';

const exportDefault = IS_I18N
  ? {
      en,
      vi,
      zh,
    }
  : { vi };

export default exportDefault;
