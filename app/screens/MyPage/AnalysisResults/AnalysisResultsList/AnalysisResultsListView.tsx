import {
  ButtonBack,
  ScreenWrapper,
  DeleteAnalysisResultModal,
} from "../../../../components";
import { useState } from "react";
import * as S from "./AnalysisResultsList.style";
import { FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 임시 데이터
const supplementData = [
  {
    id: 1,
    name: "비맥스 메타",
  },
  {
    id: 2,
    name: "오쏘몰 바이탈 에프",
  },
  {
    id: 3,
    name: "영양제 A",
  },
  {
    id: 4,
    name: "영양제 B",
  },
  {
    id: 5,
    name: "제품명",
  },
  {
    id: 6,
    name: "제품명",
  },
  {
    id: 7,
    name: "제품명",
  },
  {
    id: 8,
    name: "제품명",
  },
  {
    id: 9,
    name: "제품명",
  },
  {
    id: 10,
    name: "제품명",
  },
];

const AnalysisResultsListView = ({ navigation }: any) => {
  const [deletedStatus, setDeletedStatus] = useState<Record<number, boolean>>(
    supplementData.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const [selectedSupplement, setSelectedSupplement] = useState<number | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  const deleteResult = (id: number) => {
    if (deletedStatus[id]) {
      setSelectedSupplement(id);
      setModalVisible(true);
    } else {
      setDeletedStatus((prev) => ({
        ...prev,
        [id]: true,
      }));
    }
  };

  const handleDelete = () => {
    if (selectedSupplement !== null) {
      setDeletedStatus((prev) => ({
        ...prev,
        [selectedSupplement]: false,
      }));
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
        <FlatList
          data={supplementData.filter(({ id }) => deletedStatus[id])}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <S.SupplementCard>
              <S.InfoContainer>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("AnalysisResultsDetailView", {
                      supplementData,
                    })
                  }
                >
                  <S.NameContainer>
                    <S.SupplementName>{item.name}</S.SupplementName>
                    <S.DeleteButton onPress={() => deleteResult(item.id)}>
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#a5d6a7"
                      />
                    </S.DeleteButton>
                  </S.NameContainer>
                </TouchableOpacity>
              </S.InfoContainer>
            </S.SupplementCard>
          )}
        />
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
