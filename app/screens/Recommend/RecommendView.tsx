import {
  ScreenWrapper,
  ButtonBack,
  ButtonSaveSupplement,
} from "../../components";
import { TouchableOpacity } from "react-native";
import * as S from "./Recommend.style";
import { useEffect, useState } from "react";
import apiSO from "../../api/apiSO";

type Supplement = {
  id: number;
  name: string;
  healthIssue: string;
  imageUrl: string;
  ingredients: string;
  effect: string;
};

const RecommendView = ({ navigation }: any) => {
  const [supplementData, setSupplementData] = useState<Supplement[]>([]);
  const [savedStatus, setSavedStatus] = useState<Record<number, boolean>>({});

  const fetchRecommendations = async () => {
    try {
      const response = await apiSO.post("/supplement/recommend");
      const { recSupplement1, recSupplement2, recSupplement3 } = response.data;

      const supplements = [recSupplement1, recSupplement2, recSupplement3]
        .filter(Boolean)
        .map((item, idx) => ({
          id: idx + 1,
          name: item.name,
          healthIssue: item.healthIssue,
          imageUrl: item.imageUrl,
          ingredients: item.ingredients,
          effect: item.effect,
        }));

      setSupplementData(supplements);

      const initialSavedStatus = supplements.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {} as Record<number, boolean>);
      setSavedStatus(initialSavedStatus);
    } catch (error: any) {
      console.log("추천 영양제 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const toggleSave = (id: number) => {
    setSavedStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <ScreenWrapper>
      <S.Header>
        <ButtonBack />
        <S.Title>회원님에게 아래 영양제를 추천드려요 !</S.Title>
      </S.Header>
      <S.SupplementsContainer>
        {supplementData.map(
          ({ id, imageUrl, name, ingredients, effect, healthIssue }) => (
            <TouchableOpacity
              key={id}
              onPress={() =>
                navigation.navigate("SupplementInfoView", {
                  supplement: {
                    id,
                    imageUrl,
                    name,
                    ingredients,
                    effect,
                    healthIssue,
                  },
                })
              }
            >
              <S.SupplementCard>
                {/* 제품 이미지 */}
                <S.ImageContainer>
                  <S.ProductImage
                    source={{ uri: imageUrl }}
                    resizeMode="contain"
                  />
                </S.ImageContainer>

                {/* 제품 정보 */}
                <S.InfoContainer>
                  <S.NameContainer>
                    <S.SupplementName>{name}</S.SupplementName>
                    <ButtonSaveSupplement
                      id={id}
                      savedStatus={savedStatus}
                      toggleSave={toggleSave}
                    />
                  </S.NameContainer>
                  <S.Row>
                    <S.Badge>{ingredients}</S.Badge>
                  </S.Row>
                  <S.Description>
                    <S.BoldText>효과:</S.BoldText>
                    {effect}
                  </S.Description>
                  <S.Description>
                    <S.BoldText>주의사항:</S.BoldText>
                    {healthIssue}
                  </S.Description>
                </S.InfoContainer>
              </S.SupplementCard>
            </TouchableOpacity>
          )
        )}
      </S.SupplementsContainer>
    </ScreenWrapper>
  );
};

export default RecommendView;
