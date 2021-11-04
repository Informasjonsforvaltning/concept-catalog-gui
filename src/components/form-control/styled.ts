import styled, { css, keyframes } from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';
import ButtonBase from '@fellesdatakatalog/button';

import ContainerSC from '../container/styled';

import DraftIconBase from '../../images/icon-draft-circle-md.svg';

interface Props {
  $isSticky?: boolean;
}

export const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 0.95;
    transform: translateY(0);
  }
`;

interface StatusButtonProps {
  $active?: boolean;
}

const FormControl = styled.div<Props>`
  background-color: ${theme.colour(Colour.CYAN, 'C20')};
  margin-bottom: ${theme.spacing('S24')};
  opacity: 0.95;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  will-change: transform, opacity, visibility;

  ${({ $isSticky }) =>
    $isSticky &&
    css`
      animation-duration: 500ms;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;
      animation-name: ${slideDown};
      position: fixed;
    `}
`;

const FormControlContent = styled(ContainerSC.Container)`
  align-items: center;
  border-bottom: 1px solid ${theme.colour(Colour.GREEN, 'G30')};
  display: flex;
  flex-direction: row;
  padding: ${theme.spacing('S10')} 0;
`;

const Button = styled(ButtonBase)`
  background-color: ${theme.colour(Colour.GREEN, 'G30')};
  color: ${theme.colour(Colour.GREEN, 'G60')};
  font-weight: ${theme.fontWeight('FW400')};
  margin-right: ${theme.spacing('S10')};
  transition: all 150ms ease;

  &:hover {
    background-color: ${theme.colour(Colour.GREEN, 'G55')};
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

const StatusButton = styled(Button)<StatusButtonProps>`
  background-color: ${theme.colour(Colour.GREEN, 'G55')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};

  &:hover {
    background-color: ${theme.colour(Colour.GREEN, 'G30')};
    color: ${theme.colour(Colour.GREEN, 'G60')};
  }

  ${({ $active }) =>
    $active &&
    css`
      background-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
      color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    `}
`;

const DeleteButton = styled(Button)`
  margin-left: auto;
`;

const DraftIcon = styled(DraftIconBase)`
  width: 30px;
  height: 30px;
  margin-right: ${theme.spacing('S4')};

  & > path {
    fill: ${theme.colour(Colour.GREEN, 'G60')};
  }
  & > circle {
    fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

export default {
  FormControl,
  FormControlContent,
  Button,
  StatusButton,
  DeleteButton,
  DraftIcon
};
