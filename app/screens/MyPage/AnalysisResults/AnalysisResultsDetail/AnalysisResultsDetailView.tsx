import { ScreenWrapper, ButtonBack } from "../../../../components";
import * as S from "./AnalysisResultsDetail.style";

//임시 데이터
const supplementDetail = {
  name: "비맥스 메타",
  ingredients: "아연 10mg, 비타민 B1 1.2mg",
  effects: ["면역력 강화", "피로 해소", "혈액순환 개선"],
  precautions: ["공복 섭취 피하기\n아연 과다 복용 주의\n카페인과 함께 섭취 X"],
  users: [
    "자주 피곤하고 활력이 필요한 사람\n감기 자주 걸리는 사람\n스트레스가 많거나 손발 저림을 겪는 사람",
  ],
};

const AnalysisResultsDetailView = () => {
  const { name, ingredients, effects, precautions, users } = supplementDetail;
  return (
    <ScreenWrapper>
      <S.InfoHeader>
        <ButtonBack />
        <S.SupplementName>{name}</S.SupplementName>
      </S.InfoHeader>
      <S.InfoSection>
        <S.InfoLabel>주요 성분 및 함량</S.InfoLabel>
        <S.InfoList>{ingredients}</S.InfoList>
      </S.InfoSection>
      <S.InfoSection>
        <S.InfoLabel>효과</S.InfoLabel>
        <S.InfoList>{effects}</S.InfoList>
      </S.InfoSection>
      <S.InfoSection>
        <S.InfoLabel>복용 시 주의사항</S.InfoLabel>
        <S.InfoList>{precautions}</S.InfoList>
      </S.InfoSection>
      <S.InfoSection>
        <S.InfoLabel>이 영양제, 누구에게 필요할까요?</S.InfoLabel>
        <S.InfoList>{users}</S.InfoList>
      </S.InfoSection>
    </ScreenWrapper>
  );
};
export default AnalysisResultsDetailView;
