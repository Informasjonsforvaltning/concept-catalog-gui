import { compose, withProps } from 'recompose';

import { withRouter } from 'react-router-dom';
import { DatePickerFieldPure } from './field-datepicker-pure.component';

const mapRouteParams = withProps(({ match: { params } }) => params);

const enhance = compose(withRouter, mapRouteParams);
export const DatePickerField = enhance(DatePickerFieldPure);
