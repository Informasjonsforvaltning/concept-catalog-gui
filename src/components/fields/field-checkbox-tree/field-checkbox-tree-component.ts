import pick from 'lodash/pick';
import { compose, withProps } from 'recompose';

import { withRouter } from 'react-router-dom';
import { CheckboxTreeFieldPure } from './field-checkbox-tree-pure.component';

const mapRouteParams = withProps(({ match: { params } }) =>
  pick(params, 'catalogId')
);

const enhance = compose(withRouter, mapRouteParams);
export const CheckboxTreeField = enhance(CheckboxTreeFieldPure);
