import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ScreenWrapper, ButtonBack } from "../../../../components";
import * as S from "./AnalysisResultsDetail.style";
import { ScrollView } from "react-native";
import apiSO from "../../../../api/apiSO";

const AnalysisResultsDetailView = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSupplement = async () => {
      try {
        const response = await apiSO.get(`/analysis/get_supplement/${id}`);
        setData(response.data);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplement();
  }, [id]);

  if (loading) {
    return (
      <ScreenWrapper>
        <S.InfoHeader>
          <ButtonBack />
          <S.SupplementName>불러오는 중...</S.SupplementName>
        </S.InfoHeader>
      </ScreenWrapper>
    );
  }

  if (error || !data) {
    return (
      <ScreenWrapper>
        <S.InfoHeader>
          <ButtonBack />
          <S.SupplementName>데이터를 불러올 수 없습니다.</S.SupplementName>
        </S.InfoHeader>
        <S.InfoSection>
        <S.InfoLabel>잠시 후 다시 시도해 주세요.</S.InfoLabel>
      </S.InfoSection>
      </ScreenWrapper>
    );
  }

  const { name, ingredients, effects, warnings, forWho } = data;

  return (
    <ScreenWrapper>
      <S.InfoHeader>
        <ButtonBack />
        <S.SupplementName>{name}</S.SupplementName>
      </S.InfoHeader>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <S.InfoSection>
          <S.InfoLabel>주요 성분 및 함량</S.InfoLabel>
          {ingredients.map((item: string, idx: number) => (
            <S.InfoList key={idx}>{item}</S.InfoList>
          ))}
        </S.InfoSection>

        <S.InfoSection>
          <S.InfoLabel>효과</S.InfoLabel>
          {effects.map((item: string, idx: number) => (
            <S.InfoList key={idx}>{item}</S.InfoList>
          ))}
        </S.InfoSection>

        <S.InfoSection>
          <S.InfoLabel>복용 시 주의사항</S.InfoLabel>
          {warnings.map((item: string, idx: number) => (
            <S.InfoList key={idx}>{item}</S.InfoList>
          ))}
        </S.InfoSection>

        <S.InfoSection>
          <S.InfoLabel>이 영양제, 누구에게 필요할까요?</S.InfoLabel>
          {forWho.map((item: string, idx: number) => (
            <S.InfoList key={idx}>{item}</S.InfoList>
          ))}
        </S.InfoSection>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default AnalysisResultsDetailView;
