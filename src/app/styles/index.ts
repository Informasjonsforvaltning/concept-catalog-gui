import { createGlobalStyle } from 'styled-components';

import './bootstrap-override.scss';

import 'designsystemet/fdk-designsystem-bootstrap4/scss/helper.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/portal.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/typo.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/common.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/animations.scss';
import 'designsystemet/fdk-designsystem-bootstrap4/scss/register.scss';

import 'font-awesome/scss/font-awesome.scss';

import CommonStyles from './common';

export default createGlobalStyle`
  ${CommonStyles}
`;
