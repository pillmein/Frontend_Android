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
import apiSR from "../../../api/apiSR";

const MySupplementsView = () => {
  const [supplements, setSupplements] = useState<
    { id: number; supplementName: string; ingredients: string }[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState<number | null>(
    null
  );
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchSupplements();
    }
  }, [isFocused]);

  const fetchSupplements = async () => {
    try {
      const response = await apiSR.get("/api/v1/supplements/mylist");
      const data = response.data.data;
      setSupplements(data);
    } catch (error: any) {
      console.log(
        "복용 중인 영양제 목록 조회 실패:",
        error.response?.data || error.message
      );
    }
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
              <S.SupplementName>{item.supplementName}</S.SupplementName>
              <S.SupplementDetail>
                <S.IngredientBadge>
                  {item.ingredients
                    .split(",")
                    .slice(0, 2)
                    .map((i) => i.trim())
                    .join(", ")}
                </S.IngredientBadge>
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
