import { Modal } from "react-native";
import styled from "styled-components/native";

const AlarmSaveModal = ({ visible, onConfirm }: any) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <Overlay>
        <ModalContainer>
          <Message>알림이 저장되었습니다.</Message>
          <ButtonContainer>
            <SaveConfirmButton onPress={onConfirm}>
              <ButtonText style={{ color: "#a5d6a7" }}>확인</ButtonText>
            </SaveConfirmButton>
          </ButtonContainer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};

export default AlarmSaveModal;

const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContainer = styled.View`
  width: 80%;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  align-items: center;
`;

const Message = styled.Text`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const SaveConfirmButton = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-color: #ddd;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
