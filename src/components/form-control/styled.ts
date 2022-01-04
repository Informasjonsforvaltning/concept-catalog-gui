import styled, { css, keyframes } from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';
import ButtonBase from '@fellesdatakatalog/button';

import ContainerSC from '../container/styled';

import DraftIconBase from '../../images/icon-status-draft-circle-md.svg';
import StatusHearingIconBase from '../../images/icon-status-hearing-sm.svg';
import StatusApprovedIconBase from '../../images/icon-status-approved-sm.svg';
import StatusPublishedIconBase from '../../images/icon-status-published-sm.svg';
import StatusDraftIconBase from '../../images/icon-status-draft-sm.svg';
import RemoveIconBase from '../../images/icon-remove-circle-sm.svg';

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

const StatusHearingIcon = styled(StatusHearingIconBase)`
  width: 25px;
  margin-right: ${theme.spacing('S6')};

  & > path {
    fill: ${theme.colour(Colour.GREEN, 'G60')};
  }
`;

const StatusApprovedIcon = styled(StatusApprovedIconBase)`
  width: 25px;
  margin-right: ${theme.spacing('S6')};

  & > path {
    fill: ${theme.colour(Colour.GREEN, 'G60')};
  }
`;

const StatusPublishedIcon = styled(StatusPublishedIconBase)`
  width: 25px;
  margin-right: ${theme.spacing('S6')};

  & > path {
    fill: ${theme.colour(Colour.GREEN, 'G60')};
  }
`;

const StatusDraftIcon = styled(StatusDraftIconBase)`
  width: 25px;
  margin-right: ${theme.spacing('S6')};

  & > path {
    fill: ${theme.colour(Colour.GREEN, 'G60')};
  }
`;

const RemoveIcon = styled(RemoveIconBase)`
  width: 20px;
  margin-right: ${theme.spacing('S6')};

  & > path {
    fill: ${theme.colour(Colour.GREEN, 'G60')};
  }
`;

const Button = styled(ButtonBase)`
  background-color: ${theme.colour(Colour.GREEN, 'G30')};
  color: ${theme.colour(Colour.GREEN, 'G60')};
  font-weight: ${theme.fontWeight('FW400')};
  margin-right: ${theme.spacing('S10')};
  transition: all 150ms ease;

  &:hover {
    background-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};

    & > svg {
      & > path {
        fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
      }
    }
  }
`;

const StatusButton = styled(Button)<StatusButtonProps>`
  ${({ $active }) =>
    $active &&
    css`
      background-color: ${theme.colour(Colour.NEUTRAL, 'N70')};
      color: ${theme.colour(Colour.NEUTRAL, 'N0')};

      & > svg {
        & > path {
          fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
        }
      }
    `}
`;

const DeleteButton = styled(ButtonBase)`
  color: ${theme.colour(Colour.GREEN, 'G60')};
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
  DraftIcon,
  StatusHearingIcon,
  StatusApprovedIcon,
  StatusPublishedIcon,
  StatusDraftIcon,
  RemoveIcon
};
