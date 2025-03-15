import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { FlatList } from "react-native";
import { ScreenWrapper, ButtonBack } from "../../components";
import { AntDesign } from "@expo/vector-icons";
import * as S from "./IntakeTimeList.style";
// 임시 데이터
const supplementData = [
  {
    id: 1,
    name: "비맥스 메타",
    ingredient: "비타민B1",
    amount: "95mg",
    intakeTimes: "알림이 2개 있어요!",
  },
  {
    id: 2,
    name: "제품명",
    ingredient: "주요 성분",
    amount: "용량",
    intakeTimes: "알림이 없어요!",
  },
  {
    id: 3,
    name: "제품명",
    ingredient: "주요 성분",
    amount: "용량",
    intakeTimes: "알림이 10개 있어요!",
  },
  {
    id: 4,
    name: "제품명",
    ingredient: "주요 성분",
    amount: "용량",
    intakeTimes: "알림이 없어요!",
  },
];

const MySupplementsView = () => {
  const [supplements, setSupplements] = useState(supplementData);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchMySupplements();
    }
  }, [isFocused]);

  const fetchMySupplements = () => {
    //TODO: API 호출 넣기
    const updatedSupplements = supplementData;

    setSupplements(updatedSupplements);
  };

  return (
    <ScreenWrapper>
      <S.Header>
        <ButtonBack />
        <S.Title>나의 복용 알림 설정</S.Title>
      </S.Header>

      <FlatList
        data={supplements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <S.SupplementCard>
            <S.SupplementInfo>
              <S.SupplementName>{item.name}</S.SupplementName>
              <S.SupplementDetail>
                <S.IngredientBadge>{item.ingredient}</S.IngredientBadge>
                <S.Amount>{item.amount}</S.Amount>
              </S.SupplementDetail>
            </S.SupplementInfo>
            <S.IntakeTimes>{item.intakeTimes}</S.IntakeTimes>
            <S.MoveToSetting>
              <AntDesign name="rightcircleo" size={24} color="#a5d6a7" />
            </S.MoveToSetting>
          </S.SupplementCard>
        )}
      />
    </ScreenWrapper>
  );
};

export default MySupplementsView;
