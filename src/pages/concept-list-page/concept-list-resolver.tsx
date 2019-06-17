import _ from 'lodash';
import { resolve } from 'react-resolver';
import { registrationApiGet } from '../../api/concept-catalogue-api';

const memoizedRegistrationApiGet = _.memoize(registrationApiGet);

const mapProps = {
  concepts: () => memoizedRegistrationApiGet('mock.json')
};

export const conceptListResolver = resolve(mapProps);
