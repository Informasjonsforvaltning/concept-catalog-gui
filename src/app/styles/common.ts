import { css } from 'styled-components';

export default css`
  html,
  body {
    height: 100%;
  }

  body {
    overflow-x: hidden;
    overflow-y: scroll;
  }

  body,
  #root {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
  }

  body.no-scroll {
    overflow: hidden;
  }

  .fdk-text-size-small {
    font-size: 1.4rem;
  }

  .fdk-text-strong {
    font-weight: 500;
  }
`;
