import React, { memo, FC, PropsWithChildren } from 'react';

import SC from './styled';

interface Props {}

const Container: FC<PropsWithChildren<Props>> = ({ children }) => (
  <SC.Container>{children}</SC.Container>
);

export default memo(Container);
