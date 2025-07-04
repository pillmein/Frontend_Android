import { useEffect, useState } from "react";
import { ButtonBack } from "../../../../components";
import Header from "../../../../components/Header";
import * as S from "./SavedSupplementInfoView.style";
import apiSO from "../../../../api/apiSO";
import { FlatList } from "react-native";

type SupplementDetail = {
  name: string;
  ingredients: string[];
  effects: string[];
  warnings: string[];
};

const SavedSupplementInfoView = ({ route }: any) => {
  const { apiSupplementId } = route.params;
  const [supplement, setSupplement] = useState<SupplementDetail | null>(null);

  useEffect(() => {
    fetchSupplementDetail();
  }, []);

  const fetchSupplementDetail = async () => {
    try {
      console.log(apiSupplementId);
      const response = await apiSO.get(
        `/favorites/get_favorite/${apiSupplementId}`
      );
      const data = response.data;
      console.log("영양제 상세 조회 성공:", data);
      setSupplement(data);
    } catch (error: any) {
      console.error(
        "영양제 상세 조회 실패:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <S.Container>
      <Header />
      {supplement && (
        <FlatList
          data={[]} // 빈 배열 (스크롤 컨테이너 역할만 함)
          renderItem={null}
          ListHeaderComponent={
            <>
              <S.InfoHeader>
                <ButtonBack />
                <S.SupplementName>{supplement.name}</S.SupplementName>
              </S.InfoHeader>

              <S.InfoSection>
                <S.InfoLabel>주요 성분 및 함량</S.InfoLabel>
                {supplement.ingredients.slice(0, 3).map((item, idx) => (
                  <S.InfoList key={`ing-${idx}`}>﹒{item}</S.InfoList>
                ))}
              </S.InfoSection>

              <S.InfoSection>
                <S.InfoLabel>효과</S.InfoLabel>
                {supplement.effects.map((item, idx) => (
                  <S.InfoList key={`eff-${idx}`}>{item}</S.InfoList>
                ))}
              </S.InfoSection>

              <S.InfoSection>
                <S.InfoLabel>복용 시 주의사항</S.InfoLabel>
                {supplement.warnings.map((item, idx) => (
                  <S.InfoList key={`warn-${idx}`}>{item}</S.InfoList>
                ))}
              </S.InfoSection>
            </>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </S.Container>
  );
};
export default SavedSupplementInfoView;
