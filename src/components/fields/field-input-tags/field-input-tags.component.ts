import pick from 'lodash/pick';
import { compose, withProps } from 'recompose';

import { withRouter } from 'react-router-dom';
import { InputTagsFieldPure } from './field-input-tags-pure.component';

const mapRouteParams = withProps(({ match: { params } }) => pick(params, 'catalogId'));

const enhance = compose(withRouter, mapRouteParams);
export const InputTagsField = enhance(InputTagsFieldPure);
