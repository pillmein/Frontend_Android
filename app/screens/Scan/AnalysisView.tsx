import { useState } from "react";
import { Alert, ScrollView, View, Modal } from "react-native";
import { ScreenWrapper } from "../../components";
import ButtonBack from "../../components/Button/ButtonBack";
import * as S from "../Recommend/SupplementInfo/SupplementInfoView.style";
import { ButtonCommon } from "../../components";
import Entypo from "@expo/vector-icons/Entypo";
import styled from "styled-components/native";
import apiSR from "../../api/apiSR";

const AnalysisView = ({ route, navigation }: any) => {
  const result = route.params?.result || {};
  const {
    mainIngredients = [],
    effects = [],
    precautions = [],
    whoNeedsThis = [],
  } = result;

  const [modalVisible, setModalVisible] = useState(false);
  const [supplementName, setSupplementName] = useState("");

  if (
    !mainIngredients.length ||
    !effects.length ||
    !precautions.length ||
    !whoNeedsThis.length
  ) {
    Alert.alert("사진을 다시 찍어주세요.", "텍스트가 잘 보이게 찍어주세요!", [
      { text: "확인", onPress: () => navigation.goBack() },
    ]);
    return null;
  }

  const handleSave = () => {
    setModalVisible(true);
  };

  const confirmSave = async () => {
    console.log("분석 저장할 영양제 이름:", supplementName);
    if (!supplementName.trim()) {
      Alert.alert("입력 오류", "영양제 이름을 입력해주세요.");
      return;
    }

    try {
      setModalVisible(false);

      const requestData = {
        name: supplementName,
        mainIngredients,
        effects,
        precautions,
        whoNeedsThis,
      };

      const response = await apiSR.post("/analysis/save_analysis", requestData);

      console.log("저장 성공:", response.data);

      navigation.navigate("SupplementAddConfirmView", {
        supplementName: supplementName,
        ingredients: mainIngredients.join(", "),
      });
    } catch (error: any) {
      console.error("저장 실패:", error.response?.data || error.message);
      Alert.alert("저장 실패", "다시 시도해주세요.");
    }
  };

  return (
    <ScreenWrapper>
      <S.InfoHeader>
        <ButtonBack />
        <S.SupplementName>영양 성분 분석 결과</S.SupplementName>
      </S.InfoHeader>

      <View style={{ height: 540 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
          <S.InfoSection>
            <S.InfoLabel>주요 성분 및 함량</S.InfoLabel>
            <S.InfoList>{mainIngredients.join(", ")}</S.InfoList>
          </S.InfoSection>
          <S.InfoSection>
            <S.InfoLabel>효과</S.InfoLabel>
            <S.InfoList>{effects.join(", ")}</S.InfoList>
          </S.InfoSection>
          <S.InfoSection>
            <S.InfoLabel>복용 시 주의사항</S.InfoLabel>
            {precautions.map((item: string, index: number) => (
              <S.InfoListRow key={index}>
                <Entypo name="dot-single" size={18} color="#6a986c" />
                <S.InfoListText>{item}</S.InfoListText>
              </S.InfoListRow>
            ))}
          </S.InfoSection>
          <S.InfoSection>
            <S.InfoLabel>이 영양제, 누구에게 필요할까요?</S.InfoLabel>
            {whoNeedsThis.map((item: string, index: number) => (
              <S.InfoListRow key={index}>
                <Entypo name="dot-single" size={18} color="#6a986c" />
                <S.InfoListText>{item}</S.InfoListText>
              </S.InfoListRow>
            ))}
          </S.InfoSection>
        </ScrollView>
      </View>

      <ButtonCommon text="저장하기" onPress={handleSave} />

      {/* 저장 팝업 모달 */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>분석 결과 저장하기</ModalTitle>
            <ModalText>이 영양제의 이름을 입력해주세요!</ModalText>
            <ModalInput
              placeholder="영양제 이름"
              value={supplementName}
              onChangeText={setSupplementName}
            />
            <ModalButtonContainer>
              <ModalButton onPress={() => setModalVisible(false)}>
                <ModalButtonText>취소</ModalButtonText>
              </ModalButton>
              <Divider />
              <ModalButton onPress={confirmSave}>
                <ModalButtonText confirm>확인</ModalButtonText>
              </ModalButton>
            </ModalButtonContainer>
          </ModalBox>
        </ModalOverlay>
      </Modal>
    </ScreenWrapper>
  );
};

export default AnalysisView;

const ModalOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.View`
  width: 80%;
  background-color: white;
  border-radius: 14px;
  padding: 20px 16px 0 16px;
  align-items: center;
`;

const ModalTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const ModalText = styled.Text`
  font-size: 13px;
  color: #555;
  margin-bottom: 12px;
`;

const ModalInput = styled.TextInput`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 14px;
  margin-bottom: 16px;
`;

const ModalButtonContainer = styled.View`
  flex-direction: row;
  border-top-width: 0.5px;
  border-top-color: #ccc;
  margin-top: 8px;
`;

const ModalButton = styled.TouchableOpacity`
  flex: 1;
  padding: 14px 0;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.View`
  width: 0.5px;
  background-color: #ccc;
`;

const ModalButtonText = styled.Text<{ confirm?: boolean }>`
  font-size: 15px;
  font-weight: 500;
  color: ${(props: { confirm: any }) =>
    props.confirm ? "#a5d6a7" : "#000000"};
`;
 