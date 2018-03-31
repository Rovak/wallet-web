import * as messages_en from "./en.js";
import * as messages_nl from "./nl.js";

import {addLocaleData} from 'react-intl';
import nlLocaleData from 'react-intl/locale-data/nl';

addLocaleData([...nlLocaleData]);

export const languages = {
  'nl': messages_nl.messages,
  'en': messages_en.messages,
};
