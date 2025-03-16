import { ScreenWrapper, ButtonCommon } from "../../../components";
import * as S from "./AnalysisResult.style";

const AnalysisResultView = ({ navigation }: any) => {
  const handleRecommendPress = () => {
    navigation.navigate("RecommendView");
  };

  return (
    <ScreenWrapper>
      <S.TitleContainer>
        <S.TitleText>AI 분석 결과 🧐</S.TitleText>
      </S.TitleContainer>

      <S.ResultBox>
        <S.ResultText>
          햇볕을 많이 쬐지 못하는 생활패턴이네요! {"\n"}
          비타민 D를 점심 식사와 함께 복용하면 흡수율이 높아집니다. {"\n\n"}
          수면 부족을 겪고 있으므로, 마그네슘을 저녁에 섭취하면 신경 안정과 수면
          개선에 도움이 될 수 있어요!
        </S.ResultText>
      </S.ResultBox>
      <ButtonCommon text="영양제 추천 받기" navigateTo="RecommendView" />
    </ScreenWrapper>
  );
};

export default AnalysisResultView;
