import pick from 'lodash/pick';
import { compose, withProps } from 'recompose';

import { withRouter } from 'react-router-dom';
import { SelectFieldPure } from './field-select-pure.component';

const mapRouteParams = withProps(({ match: { params } }) =>
  pick(params, 'catalogId')
);

const enhance = compose(withRouter, mapRouteParams);
export const SelectField = enhance(SelectFieldPure);
