import {
  ScreenWrapper,
  ButtonBack,
  ButtonSaveSupplement,
} from "../../components";
import { TouchableOpacity } from "react-native";
import * as S from "./Recommend.style";
import { useEffect, useState } from "react";
import apiSO from "../../api/apiSO";
import { ActivityIndicator, View, Text, ScrollView } from "react-native";

type Supplement = {
  id: number;
  name: string;
  imageUrl: string;
  ingredients: string;
  effect: string;
};

const RecommendView = ({ navigation }: any) => {
  const [supplementData, setSupplementData] = useState<Supplement[]>([]);
  const [savedStatus, setSavedStatus] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState<boolean>(true);

  // mock-up data
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const { recSupplement1, recSupplement2, recSupplement3 } = {
  //       recSupplement1: {
  //         effect:
  //           "혈액 속 지방 수치를 개선하고 혈액 흐름을 도와 스트레스성 두통이나 불면 증상 완화에 도움이 됩니다. 또한 기억력과 눈의 건조함 개선에도 효과적입니다.",
  //         healthIssue: "혈액 순환 저하와 눈 피로, 기억력 저하",
  //         imageUrl:
  //           "https://shopping-phinf.pstatic.net/main_8492772/84927724574.1.jpg",
  //         ingredients: "EPA, DHA",
  //         name: "이너가든 초임계 알티지오메가3",
  //       },
  //       recSupplement2: {
  //         effect:
  //           "면역 기능을 강화해 잦은 피로나 감기 예방에 도움이 됩니다. 몸이 쉽게 지치거나 회복이 느릴 때 좋은 보충제입니다.",
  //         healthIssue: "면역력 약화",
  //         imageUrl:
  //           "https://shopping-phinf.pstatic.net/main_8433487/84334873590.jpg",
  //         ingredients: "인삼분말",
  //         name: "고려태극삼분말",
  //       },
  //       recSupplement3: {
  //         effect:
  //           "신경 안정과 근육 이완에 도움이 되어 마그네슘 부족으로 생기는 피로감, 근육 경련, 스트레스 증상을 완화하는 데 효과적입니다.",
  //         healthIssue: "마그네슘 보충",
  //         imageUrl:
  //           "https://shopping-phinf.pstatic.net/main_8775725/87757257521.3.jpg",
  //         ingredients: "황산마그네슘",
  //         name: "하이뮨 칼슘 마그네슘",
  //       },
  //     };

  //     const supplements = [recSupplement1, recSupplement2, recSupplement3]
  //       .filter(Boolean)
  //       .map((item, idx) => ({
  //         id: idx + 1,
  //         name: item.name,
  //         imageUrl: item.imageUrl,
  //         ingredients: item.ingredients,
  //         effect: item.effect,
  //       }));

  //     setSupplementData(supplements);

  //     setLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await apiSO.post("/supplement/recommend");
      const { recSupplement1, recSupplement2, recSupplement3 } = response.data;

      console.log(response.data);

      const supplements = [recSupplement1, recSupplement2, recSupplement3]
        .filter(Boolean)
        .map((item, idx) => ({
          id: idx + 1,
          name: item.name,
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
    } finally {
      setLoading(false);
    }
  };

  const toggleSave = (id: number) => {
    setSavedStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <ScreenWrapper>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#a5d6a7" />
          <Text style={{ marginTop: 16, fontSize: 16, color: "#666" }}>
            추천 영양제 불러오는 중입니다...
          </Text>
        </View>
      ) : (
        <>
          <S.Header>
            <ButtonBack />
            <S.Title>회원님에게 아래 영양제를 추천드려요 !</S.Title>
          </S.Header>
          <ScrollView>
            <S.SupplementsContainer>
              {supplementData.map(
                ({ id, imageUrl, name, ingredients, effect }) => (
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
                          <S.Badge>주요 성분</S.Badge>
                          <S.Description>
                            {typeof ingredients === "string"
                              ? ingredients
                                  .split(",")
                                  .slice(0, 2)
                                  .map((i) => i.trim())
                                  .join(", ")
                              : " "}
                          </S.Description>
                        </S.Row>
                        <S.Row>
                          <S.Badge>효과</S.Badge>
                          <S.Description>{effect}</S.Description>
                        </S.Row>
                      </S.InfoContainer>
                    </S.SupplementCard>
                  </TouchableOpacity>
                )
              )}
            </S.SupplementsContainer>
          </ScrollView>
        </>
      )}
    </ScreenWrapper>
  );
};

export default RecommendView;
