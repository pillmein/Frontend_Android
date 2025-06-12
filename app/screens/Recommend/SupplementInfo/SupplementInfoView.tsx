import { RouteProp, useRoute } from "@react-navigation/native";
import ButtonBack from "../../../components/Button/ButtonBack";
import Header from "../../../components/Header";
import * as S from "./SupplementInfoView.style";

type SupplementDetailRouteParams = {
  SupplementInfoView: {
    supplement: {
      name: string;
      ingredients: string;
      effect: string;
    };
  };
};

const SupplementInfoView = () => {
  const route = useRoute<RouteProp<SupplementDetailRouteParams, "SupplementInfoView">>();
  const { supplement } = route.params;
  const { name, ingredients, effect } = supplement;

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
        <S.InfoList>{effect}</S.InfoList>
      </S.InfoSection>
    </S.Container>
  );
};

export default SupplementInfoView;
