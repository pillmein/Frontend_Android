import {
  ButtonBack,
  ScreenWrapper,
  DeleteAnalysisResultModal,
} from "../../../../components";
import { useEffect, useState } from "react";
import * as S from "./AnalysisResultsList.style";
import { FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import apiSO from "../../../../api/apiSO";

type Supplement = {
  id: number;
  name: string;
};

const AnalysisResultsListView = ({ navigation }: any) => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [deletedStatus, setDeletedStatus] = useState<Record<number, boolean>>({});
  const [selectedSupplementId, setSelectedSupplementId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // API에서 목록 불러오기
  useEffect(() => {
    const fetchSupplements = async () => {
      try {
        const response = await apiSO.get("/analysis/get_supplements");
        const data: Supplement[] = response.data.supplements;

        setSupplements(data);

        const initialStatus: Record<number, boolean> = {};
        data.forEach((item) => {
          initialStatus[item.id] = true;
        });
        setDeletedStatus(initialStatus);
        console.log("분석 결과 목록 가져오기 성공");
      } catch (error) {
        console.error("영양제 목록 가져오기 실패:", error);
      }
    };

    fetchSupplements();
  }, []);

  // 삭제 버튼 누를 때 모달 표시
  const deleteResult = (id: number) => {
    if (deletedStatus[id]) {
      setSelectedSupplementId(id);
      setModalVisible(true);
    } else {
      setDeletedStatus((prev) => ({
        ...prev,
        [id]: true,
      }));
    }
  };

  // 삭제 확인 시 API 호출
  const handleDelete = async () => {
    if (selectedSupplementId !== null) {
      try {
        await apiSO.delete("/analysis/delete-analysis", {
          data: { id: selectedSupplementId }
        });

        setDeletedStatus((prev) => ({
          ...prev,
          [selectedSupplementId]: false,
        }));
      } catch (error: any) {
        console.error("삭제 실패:", error.response?.data || error.message);
      }
    }
    setModalVisible(false);
  };

  return (
    <ScreenWrapper>
      <S.Header>
        <ButtonBack />
        <S.Title>분석 결과 목록</S.Title>
      </S.Header>
      <S.SupplementsContainer>
        {supplements.length === 0 ? (
          <S.EmptyMessageContainer>
            <S.EmptyMessageText>분석 결과 목록이 없어요!{"\n"}영양제 라벨 성분 분석 결과를 저장해보세요.</S.EmptyMessageText>
          </S.EmptyMessageContainer>
        ) : (
          <FlatList
            data={supplements.filter(({ id }) => deletedStatus[id])}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <S.SupplementCard>
                <S.InfoContainer>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("AnalysisResultsDetailView", {
                        id: item.id,
                      })
                    }
                  >
                    <S.NameContainer>
                      <S.SupplementName>{item.name}</S.SupplementName>
                      <S.DeleteButton onPress={() => deleteResult(item.id)}>
                        <Ionicons name="trash-outline" size={20} color="#a5d6a7" />
                      </S.DeleteButton>
                    </S.NameContainer>
                  </TouchableOpacity>
                </S.InfoContainer>
              </S.SupplementCard>
            )}
          />
        )}
      </S.SupplementsContainer>
      <DeleteAnalysisResultModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDelete}
      />
    </ScreenWrapper>
  );
};

export default AnalysisResultsListView;
