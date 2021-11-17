import styled, { css, keyframes } from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';
import Button from '@fellesdatakatalog/button';

export const popIn = keyframes`
  0% {
    opacity: 0;
    transform: scaleY(0);
  }
  50% {
    opacity: 0;
    transform: scaleY(1);
  }
  100% {
    opacity: 1;
  }
`;

interface Props {
  $positionAbsolute: boolean;
}

const Comment = styled.div<Props>`
  background-color: ${theme.colour(Colour.CYAN, 'C30')};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing('S10')};
  padding: ${theme.spacing('S32')} ${theme.spacing('S40')};
  will-change: transform, opacity, visibility;
  animation-duration: 500ms;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
  animation-name: ${popIn};

  & > div {
    margin-bottom: ${theme.spacing('S10')};
  }

  ${({ $positionAbsolute }) =>
    $positionAbsolute &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1002;
    `}
`;

const UserAndDateLabels = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserLabel = styled.div`
  font-weight: ${theme.fontWeight('FW700')};
`;

const DateLabel = styled.div`
  margin-left: auto;
`;

const CommentText = styled.div`
  white-space: pre-line;

  & > h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: ${theme.spacing('S10')};
  }
  & > h2 {
    font-size: ${theme.fontSize('FS20')};
  }
  & > h3 {
    font-size: ${theme.fontSize('FS16')};
  }
  & > h4 {
    font-size: ${theme.fontSize('FS14')};
  }
  & > h5 {
    font-size: ${theme.fontSize('FS12')};
  }
  & > h6 {
    font-size: ${theme.fontSize('FS12')};
  }
  & > p {
    & > a {
      border-bottom: 3px solid ${theme.colour(Colour.BLUE, 'B15')};
    }
    & > a.arrow {
      align-items: center;
      display: inline-flex;
      &:after {
        font-family: 'Material Icons';
        content: '\\e5c8';
        font-size: ${theme.fontSize('FS12')};
        margin-left: ${theme.spacing('S4')};
      }
    }
    & code {
      font: 'Roboto Mono, monospace';
    }
    & em {
      font-style: italic;
    }
  }
  & > div {
    & > div {
      margin-bottom: ${theme.spacing('S10')};
      & > * > a {
        align-items: center;
        border-bottom: 3px solid ${theme.colour(Colour.BLUE, 'B15')};
        display: inline-flex;
      }
    }
  }
  & > ol,
  ul {
    margin-left: 2em;
  }
  & > ul {
    list-style: disc;
  }
  & > ol {
    list-style: decimal;
  }
`;

const ControlButtons = styled.div`
  display: flex;
  & > button {
    margin-right: ${theme.spacing('S10')};
  }
`;

const ChangeButton = styled(Button)`
  color: ${theme.colour(Colour.BLUE, 'B60')};
`;

const DeleteButton = styled(Button)`
  color: ${theme.colour(Colour.RED, 'R60')};
`;

export default {
  Comment,
  UserAndDateLabels,
  UserLabel,
  DateLabel,
  CommentText,
  ControlButtons,
  ChangeButton,
  DeleteButton
};
