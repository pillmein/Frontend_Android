import {
  ButtonBack,
  ScreenWrapper,
  ButtonSaveSupplement,
  DeleteSavedSupplementModal,
} from "../../../../components";
import { useEffect, useState } from "react";
import * as S from "./SavedSupplements.style";
import { FlatList, TouchableOpacity } from "react-native";
import apiSO from "../../../../api/apiSO";

const SavedSupplementsView = ({ navigation }: any) => {
  const [supplements, setSupplements] = useState<any[]>([]);
  const [savedStatus, setSavedStatus] = useState<Record<number, boolean>>(
    supplements.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {} as Record<number, boolean>)
  );
  const [selectedSupplement, setSelectedSupplement] = useState<number | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchSavedSupplements();
  }, []);

  const fetchSavedSupplements = async () => {
    try {
      const response = await apiSO.get("/favorites/get_favorites");
      const data = response.data;
      console.log("찜한 영양제 목록 조회 성공:", data);
      setSupplements(data);
      // 찜 여부 초기화 (전부 true)
      const initialStatus = data.reduce(
        (acc: Record<number, boolean>, item: any) => {
          acc[item.apiSupplementId] = true;
          return acc;
        },
        {}
      );
      setSavedStatus(initialStatus);
    } catch (error: any) {
      console.log(
        "찜한 영양제 목록 조회 실패:",
        error.response?.data || error.message
      );
    }
  };

  const toggleSave = (apiSupplementId: number) => {
    if (savedStatus[apiSupplementId]) {
      setSelectedSupplement(apiSupplementId);
      setModalVisible(true);
    } else {
      setSavedStatus((prev) => ({
        ...prev,
        [apiSupplementId]: true,
      }));
    }
  };

  const handleDelete = async () => {
    if (selectedSupplement !== null) {
      try {
        await apiSO.delete(`/favorites/delete_favorite`, {
          data: { apiSupplementId: selectedSupplement },
        });
        console.log("찜한 영양제 삭제 성공:", selectedSupplement);

        setSavedStatus((prev) => ({
          ...prev,
          [selectedSupplement]: false,
        }));
        setSupplements((prev) =>
          prev.filter((item) => item.apiSupplementId !== selectedSupplement)
        );
      } catch (error: any) {
        console.error(
          "찜한 영양제 삭제 실패:",
          error.response?.data || error.message
        );
      }
    }
    setModalVisible(false);
  };

  return (
    <ScreenWrapper>
      <S.Header>
        <ButtonBack />
        <S.Title>찜한 영양제 목록</S.Title>
      </S.Header>
      <S.SupplementsContainer>
        {supplements.length === 0 ? (
          <S.EmptyMessageContainer>
            <S.EmptyMessageText>
              찜한 영양제가 없어요!{"\n"}영양제 추천을 받아보고 영양제를 찜해보세요
            </S.EmptyMessageText>
          </S.EmptyMessageContainer>
        ) : (
          <FlatList
            data={supplements}
            keyExtractor={(item) => item.apiSupplementId.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SavedSupplementInfoView", {
                    apiSupplementId: item.apiSupplementId,
                  })
                }
              >
                <S.SupplementCard>
                  <S.ImageContainer>
                    <S.ProductImage
                      source={{ uri: item.imgUrl }}
                      resizeMode="contain"
                    />
                  </S.ImageContainer>

                  <S.InfoContainer>
                    <S.NameContainer>
                      <S.SupplementName>{item.name}</S.SupplementName>
                      <ButtonSaveSupplement
                        apiSupplementId={item.apiSupplementId}
                        savedStatus={savedStatus}
                        toggleSave={toggleSave}
                      />
                    </S.NameContainer>
                    <S.Row>
                      <S.Badge>
                        {(() => {
                          if (!item.ingredients) return "정보 없음";
                          const ingredientsArray = item.ingredients
                            .split(",")
                            .map((i: string) => i.trim());
                          const shown = ingredientsArray.slice(0, 2).join(", ");
                          return shown;
                        })()}
                      </S.Badge>
                    </S.Row>
                    <S.Description>
                      <S.BoldText>효과:</S.BoldText> {item.effects}
                    </S.Description>
                    <S.Description>
                      <S.BoldText>주의사항:</S.BoldText> {item.warnings}
                    </S.Description>
                  </S.InfoContainer>
                </S.SupplementCard>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 150 }}
          />
        )}
      </S.SupplementsContainer>

      <DeleteSavedSupplementModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleDelete}
      />
    </ScreenWrapper>

  );
};

export default SavedSupplementsView;
