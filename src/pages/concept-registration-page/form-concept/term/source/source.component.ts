import pick from 'lodash/pick';
import { compose, withProps } from 'recompose';

import { withRouter } from 'react-router-dom';
import { FC } from 'react';
import { SourcePure } from './source-pure.component';

interface Props {
  fieldName: string;
}

const mapRouteParams = withProps(({ match: { params } }) =>
  pick(params, 'catalogId')
);

const enhance = compose(withRouter, mapRouteParams);
export const Source: FC<Props> = enhance(SourcePure);
