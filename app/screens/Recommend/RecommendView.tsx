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
  apiSupplementId: number;
  name: string;
  imageUrl: string;
  ingredients: string;
  effect: string;
};

const RecommendView = ({ navigation }: any) => {
  const [supplementData, setSupplementData] = useState<Supplement[]>([]);
  const [savedStatus, setSavedStatus] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState<boolean>(true);

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
          apiSupplementId: item.apiSupplementId,
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

  const toggleSave = async (id: number) => {
    const target = supplementData.find((s) => s.id === id);
    if (!target) return;

    const isCurrentlySaved = savedStatus[id];

    if (!isCurrentlySaved) {
      try {
        await apiSO.post("/favorites/save_favorite", {
          apiSupplementId: target.apiSupplementId,
          imgUrl: target.imageUrl,
        });
        console.log("찜하기 성공:", target.name);
      } catch (error: any) {
        console.error("찜 실패:", error.response?.data || error.message);
        return;
      }
    } else {
      await apiSO.delete("/favorites/delete_favorite", {
        data: { apiSupplementId: target.apiSupplementId },
      });
      console.log("찜 삭제 성공:", target.name);
    }
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
                            apiSupplementId={id}
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
