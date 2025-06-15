import * as S from "./PreRecommend.style";
import { Image, View } from "react-native";
import logo from "../../../assets/splashLogo.png";
import { ScreenWrapper } from "../../../components";

const PrevRecommendView = ({ navigation }: any) => {
  return (
    <ScreenWrapper>
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
          height: 150,
          marginTop: 100,
        }}
      >
        <Image
          source={logo}
          style={{
            height: 150,
            width: 150,
            marginRight: 20,
            resizeMode: "contain",
          }}
        />
      </View>
      <S.Description>
        간단한 3단계 설문을 완료하면, {"\n"}당신에게 딱 맞는 영양제를 추천해
        드려요!
      </S.Description>
      <S.Checklist>✔ 생활습관 체크</S.Checklist>
      <S.Checklist>✔ 건강 고민 확인</S.Checklist>
      <S.Checklist>✔ 현재 복용 영양제 입력</S.Checklist>
      <S.ButtonContainer>
        <S.Button onPress={() => navigation.navigate("ReSurveyAnswersView")}>
          <S.ButtonText>건강설문 새로 답하기 ✏️</S.ButtonText>
        </S.Button>
        <S.Button onPress={() => navigation.navigate("AnalysisResultView")}>
          <S.ButtonText>이전 답변 이용할게요.</S.ButtonText>
        </S.Button>
      </S.ButtonContainer>
    </ScreenWrapper>
  );
};
export default PrevRecommendView;
