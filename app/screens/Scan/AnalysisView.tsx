import { ScreenWrapper } from "../../components";
import ButtonBack from "../../components/Button/ButtonBack";
import * as S from "../Recommend/SupplementInfo/SupplementInfoView.style";
import { ButtonCommon } from "../../components";
import Entypo from "@expo/vector-icons/Entypo";
import { Alert, ScrollView, View } from "react-native";

const AnalysisView = ({ route, navigation }: any) => {
  const result = route.params?.result || {};
  const {
    mainIngredients = [],
    effects = [],
    precautions = [],
    whoNeedsThis = [],
  } = result;

  if (
    !result.mainIngredients.length ||
    !result.effects.length ||
    !result.precautions.length ||
    !result.whoNeedsThis.length
  ) {
    Alert.alert("사진을 다시 찍어주세요.", "텍스트가 잘 보이게 찍어주세요!", [
      {
        text: "확인",
        onPress: () => navigation.goBack(),
      },
    ]);
    return;
  }

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
      <ButtonCommon text="저장하기" />
    </ScreenWrapper>
  );
};
export default AnalysisView;
