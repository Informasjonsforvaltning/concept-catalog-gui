import { createGlobalStyle } from 'styled-components';

import './bootstrap-override.scss';

import 'font-awesome/scss/font-awesome.scss';

import CommonStyles from './common';

export default createGlobalStyle`
  ${CommonStyles}
`;
