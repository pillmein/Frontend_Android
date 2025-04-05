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

  const fetchRecommendations = async () => {
    try {
      const response = await apiSO.post("/supplement/recommend");
      const { recSupplement1, recSupplement2, recSupplement3 } = response.data;

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
                          <S.Badge>{ingredients}</S.Badge>
                        </S.Row>
                        <S.Description>
                          <S.BoldText>효과: </S.BoldText>
                          {effect}
                        </S.Description>
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
