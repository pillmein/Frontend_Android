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

// //임시 데이터
// const supplementData = [
//   {
//     id: 1,
//     image:
//       "https://mblogthumb-phinf.pstatic.net/MjAxOTEwMThfMjYw/MDAxNTcxMzgxNjI0NDYx.O50IFDXsRFr5xxzQllBdkJyDRYLYVn0B3vcXT3QT89Eg.Ge8tcmWVjRte8AOo1t9f5Lo0zMgIEKpfiVFHXTV0E9kg.PNG.pharmcadia/SE-f4b5e85f-8d97-4baa-a98f-155b006c6415.png?type=w800",
//     name: "비맥스 메타",
//     ingredients: "비타민B1",
//     amount: "95mg",
//     effects: "피로 회복, 신경 건강 지원, 에너지 대사 촉진",
//     precautions: "공복 섭취 피하기, 야연 과다 복용 주의",
//   },
//   {
//     id: 2,
//     image: "",
//     name: "영양제 A",
//     ingredients: "비타민C, 아연",
//     amount: "500mg, 10mg",
//     effects: "면역력 강화, 항산화 작용",
//     precautions: "과다 섭취 시 위장 장애 가능",
//   },
//   {
//     id: 3,
//     image: "",
//     name: "영양제 B",
//     ingredients: "오메가3, DHA",
//     amount: "1000mg",
//     effects: "혈액 순환 개선, 두뇌 건강 지원",
//     precautions: "혈액 응고 억제 효과로 수술 전 섭취 주의",
//   },
// ];

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
                    <S.BoldText>효과:</S.BoldText>{effect}</S.Description>
                  <S.Description>
                    <S.BoldText>주의사항:</S.BoldText>{healthIssue}</S.Description>
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
