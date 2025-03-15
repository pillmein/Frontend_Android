import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  ScreenWrapper,
  ButtonBack,
  ButtonCommon,
  DeleteMySupplementModal,
} from "../../../components";
import * as S from "./MySupplements.style";
// 임시 데이터
const supplementData = [
  {
    id: 1,
    name: "비맥스 메타",
    ingredient: "비타민B1",
    amount: "95mg",
  },
  {
    id: 2,
    name: "제품명",
    ingredient: "주요 성분",
    amount: "용량",
  },
  {
    id: 3,
    name: "제품명",
    ingredient: "주요 성분",
    amount: "용량",
  },
  {
    id: 4,
    name: "제품명",
    ingredient: "주요 성분",
    amount: "용량",
  },
];

const MySupplementsView = () => {
  const [supplements, setSupplements] = useState(supplementData);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState<number | null>(
    null
  );
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

  // 삭제 버튼 클릭 시 모달
  const handleDeletePress = (id: number) => {
    setSelectedSupplement(id); // 삭제할 영양제 저장
    setModalVisible(true); // 모달 표시
  };

  // 모달에서 삭제 버튼 눌렀을 경우
  const handleConfirmDelete = () => {
    if (selectedSupplement !== null) {
      setSupplements((prev) =>
        prev.filter((item) => item.id !== selectedSupplement)
      );
    }
    setModalVisible(false);
    setSelectedSupplement(null); // 초기화
  };

  return (
    <ScreenWrapper>
      <S.Header>
        <ButtonBack />
        <S.Title>나의 영양제 목록</S.Title>
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
            <S.DeleteButton onPress={() => handleDeletePress(item.id)}>
              <Ionicons name="trash-outline" size={22} color="#a5d6a7" />
            </S.DeleteButton>
          </S.SupplementCard>
        )}
      />

      {/* 영양제 추가 */}
      <ButtonCommon
        text="복용 중인 영양제 추가하기"
        navigateTo="AddMySupplementsView"
      />

      <DeleteMySupplementModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirmDelete}
      />
    </ScreenWrapper>
  );
};

export default MySupplementsView;
