import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { FlatList, TouchableOpacity } from "react-native";
import { ScreenWrapper, ButtonBack } from "../../components";
import { AntDesign } from "@expo/vector-icons";
import * as S from "./IntakeTimeList.style";
import apiSR from "../../api/apiSR";

type Supplement = {
  id: number;
  name: string;
  ingredients: string;
  alarmCount: string;
};

const MySupplementsView = ({ navigation }: any) => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchMySupplements();
    }
  }, [isFocused]);

  const fetchMySupplements = async () => {
    try {
      const response = await apiSR.get("/api/v1/intakes/alarm");

      console.log("복용 알림 API 응답:", JSON.stringify(response.data));

      const mappedData: Supplement[] = response.data.data.map(
        (item: any): Supplement => {
          const { supplementId, supplementName, ingredients, alarmCount } =
            item;

          return {
            id: supplementId,
            name: supplementName,
            ingredients: ingredients,
            alarmCount:
              alarmCount > 0
                ? `알림이 ${alarmCount}개 있어요!`
                : "알림이 없어요!",
          };
        }
      );

      setSupplements(mappedData);
    } catch (error: any) {
      console.log(
        "복용 알림 조회 실패:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <ScreenWrapper>
      <S.Header>
        <ButtonBack />
        <S.Title>⏰ 최적의 복용 시간대 추천</S.Title>
      </S.Header>
      {supplements.length === 0 ? (
        <S.EmptyMessageContainer>
          <S.EmptyMessageText>
            나의 영양제가 없어요!{"\n"}복용 중인 영양제를 추가해보세요.
          </S.EmptyMessageText>
        </S.EmptyMessageContainer>
      ) : (
        <FlatList
          data={supplements}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <S.SupplementCard>
              <S.SupplementInfo>
                <S.SupplementName>{item.name}</S.SupplementName>
                <S.SupplementDetail>
                  <S.IngredientBadge>
                    {(() => {
                      if (!item.ingredients) return "정보 없음";
                      const ingredientsArray = item.ingredients
                        .split(",")
                        .map((i) => i.trim());
                      const shown = ingredientsArray.slice(0, 2).join(", ");
                      return shown;
                    })()}
                  </S.IngredientBadge>
                </S.SupplementDetail>
              </S.SupplementInfo>
              <S.MoveToSetting>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("RecommendAlarmTimeView", {
                      supplementId: item.id,
                      supplementName: item.name,
                    })
                  }
                >
                  <AntDesign name="rightcircleo" size={24} color="#a5d6a7" />
                </TouchableOpacity>
              </S.MoveToSetting>
            </S.SupplementCard>
          )}
        />
      )}
    </ScreenWrapper>
  );
};

export default MySupplementsView;
