import pick from 'lodash/pick';
import { compose, withProps } from 'recompose';

import { withRouter } from 'react-router-dom';
import { InputFieldPure } from './field-input-pure.component';

const mapRouteParams = withProps(({ match: { params } }) =>
  pick(params, 'catalogId')
);

const enhance = compose(withRouter, mapRouteParams);
export const InputField = enhance(InputFieldPure);
