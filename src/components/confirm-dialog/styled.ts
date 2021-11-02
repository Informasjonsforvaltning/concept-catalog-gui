import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import ButtonBase from '@fellesdatakatalog/button';

const onMobileView = '@media (max-width: 900px)';

const ConfirmDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  overflow-y: scroll;
  z-index: 1000;
`;

const ModalHeading = styled.h1`
  font-size: ${theme.fontSize('FS28')};
  font-weight: ${theme.fontWeight('FW700')};
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > *:nth-of-type(n + 2) {
    margin-left: 10px;
  }
`;

const Text = styled.div`
  font-size: ${theme.fontSize('FS20')};
`;

const Modal = styled.div`
  position: relative;
  left: 50%;
  width: 30vw;
  margin-top: 20vh;
  transform: translate3d(-50%, 0, 0);
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 100px 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  padding: ${theme.spacing('S16')};

  ${onMobileView} {
    & {
      width: 90vw;
    }
  }

  & > ${ModalHeading}, & > ${ModalActions}, & > ${Text} {
    padding: ${theme.spacing('S16')};
  }
`;

const ConfirmButton = styled(ButtonBase)`
  background-color: ${theme.colour(Colour.GREEN, 'G55')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};

  &:hover {
    color: ${theme.colour(Colour.GREEN, 'G60')};
  }
`;

const CancelButton = styled(ButtonBase)`
  color: ${theme.colour(Colour.GREEN, 'G55')};

  &:hover {
    color: ${theme.colour(Colour.GREEN, 'G60')};
  }
`;

export default {
  ConfirmDialog,
  Modal,
  ModalHeading,
  ModalActions,
  Text,
  ConfirmButton,
  CancelButton
};
