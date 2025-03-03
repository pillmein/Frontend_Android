import { Modal } from "react-native";
import styled from "styled-components/native";

const DeleteSavedSupplementModal = ({ visible, onClose, onConfirm }: any) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <Overlay>
        <ModalContainer>
          <Title>영양제 삭제</Title>
          <Message>이 영양제를 찜한 영양제 목록에서 삭제하시겠어요?</Message>
          <ButtonContainer>
            <CancelButton onPress={onClose}>
              <ButtonText>취소</ButtonText>
            </CancelButton>
            <DeleteButton onPress={onConfirm}>
              <ButtonText style={{ color: "#a5d6a7" }}>삭제</ButtonText>
            </DeleteButton>
          </ButtonContainer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};

export default DeleteSavedSupplementModal;

const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContainer = styled.View`
  width: 80%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Message = styled.Text`
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const CancelButton = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-color: #ddd;
`;

const DeleteButton = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-left-width: 1px;
  border-color: #ddd;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
