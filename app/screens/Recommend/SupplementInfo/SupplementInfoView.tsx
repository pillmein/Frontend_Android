import ButtonBack from "../../../components/ButtonBack";
import Header from "../../../components/Header";
import * as S from "./SupplementInfoView.style";

//임시 데이터
const supplementDetail = {
  name: "비맥스 메타",
  ingredients: "아연 10mg, 비타민 B1 1.2mg",
  effects: ["면역력 강화", "피로 해소", "혈액순환 개선"],
  precautions: ["공복 섭취 피하기\n아연 과다 복용 주의\n카페인과 함께 섭취 X"],
};

const SupplementInfoView = () => {
  const { name, ingredients, effects, precautions } = supplementDetail;
  return (
    <S.Container>
      <Header />
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
    </S.Container>
  );
};
export default SupplementInfoView;
