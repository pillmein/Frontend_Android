import {
  ButtonBack,
  ScreenWrapper,
  ButtonSaveSupplement,
  DeleteSavedSupplementModal,
} from "../../../components";
import { useState } from "react";
import * as S from "./SavedSupplements.style";
import { TouchableOpacity } from "react-native";

// 임시 데이터
const supplementData = [
  {
    id: 1,
    image:
      "https://mblogthumb-phinf.pstatic.net/MjAxOTEwMThfMjYw/MDAxNTcxMzgxNjI0NDYx.O50IFDXsRFr5xxzQllBdkJyDRYLYVn0B3vcXT3QT89Eg.Ge8tcmWVjRte8AOo1t9f5Lo0zMgIEKpfiVFHXTV0E9kg.PNG.pharmcadia/SE-f4b5e85f-8d97-4baa-a98f-155b006c6415.png?type=w800",
    name: "비맥스 메타",
    ingredients: "비타민B1",
    amount: "95mg",
    effects: "피로 회복, 신경 건강 지원, 에너지 대사 촉진",
    precautions: "공복 섭취 피하기, 야연 과다 복용 주의",
  },
  {
    id: 2,
    image: "",
    name: "영양제 A",
    ingredients: "비타민C",
    amount: "500mg",
    effects: "면역력 강화, 항산화 작용",
    precautions: "과다 섭취 시 위장 장애 가능",
  },
  {
    id: 3,
    image: "",
    name: "영양제 B",
    ingredients: "오메가3",
    amount: "1000mg",
    effects: "혈액 순환 개선, 두뇌 건강 지원",
    precautions: "혈액 응고 억제 효과로 수술 전 섭취 주의",
  },
];

const SavedSupplementsView = ({ navigation }: any) => {
  const [savedStatus, setSavedStatus] = useState<Record<number, boolean>>(
    supplementData.reduce((acc, item) => {
      acc[item.id] = true;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const [selectedSupplement, setSelectedSupplement] = useState<number | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSave = (id: number) => {
    if (savedStatus[id]) {
      setSelectedSupplement(id);
      setModalVisible(true);
    } else {
      setSavedStatus((prev) => ({
        ...prev,
        [id]: true,
      }));
    }
  };

  const handleDelete = () => {
    if (selectedSupplement !== null) {
      setSavedStatus((prev) => ({
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
        <S.Title>찜한 영양제 목록</S.Title>
      </S.Header>
      <S.SupplementsContainer>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SavedSupplementInfoView", { supplementData })
          }
        >
          {supplementData.map(
            ({
              id,
              image,
              name,
              ingredients,
              amount,
              effects,
              precautions,
            }) => (
              <S.SupplementCard key={id}>
                {/* 제품 이미지 */}
                <S.ImageContainer>
                  <S.ProductImage
                    source={{ uri: image }}
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
                    <S.Amount>{amount}</S.Amount>
                  </S.Row>
                  <S.Description>
                    <S.BoldText>효과:</S.BoldText> {effects}
                  </S.Description>
                  <S.Description>
                    <S.BoldText>주의사항:</S.BoldText> {precautions}
                  </S.Description>
                </S.InfoContainer>
              </S.SupplementCard>
            )
          )}
        </TouchableOpacity>
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
