import { ScreenWrapper, ButtonCommon } from "../../../components";
import * as S from "./AnalysisResult.style";
import apiSO from "../../../api/apiSO";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, ScrollView } from "react-native";

const AnalysisResultView = ({ navigation }: any) => {
  const [analysisSummary, setAnalysisSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // mock-up data
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setAnalysisSummary(
  //       "1순위: 사용자님의 소화 문제와 집중력 문제가 가장 우려됩니다. 이러한 증상들은 각각 소화 기능 저하와 인지 기능 저하의 징후일 수 있습니다. 따라서 식사 시 프로바이오틱스와 비타민 B군을 함께 섭취하시는 것이 좋습니다. \n\n2순위: 두번째로, 눈의 피로와 시력 저하 문제가 중요합니다. 이러한 문제를 완화하기 위해서는 비타민 A와 루테인이 필요합니다. 이 두 영양소를 저녁 식사와 함께 복용하시는 것이 좋습니다.\n\n3순위: 마지막으로, 일상에서 느끼는 신체적 피로감이 있는데, 이는 철분과 비타민 B군, 그리고 마그네슘 섭취로 완화시킬 수 있습니다. 아침 식사와 함께 복용해보시기 바랍니다."
  //     );
  //     setLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await apiSO.post("/health/health-analysis");

        if (response?.data?.analysisSummary) {
          setAnalysisSummary(response.data.analysisSummary);
        } else {
          setAnalysisSummary("분석 결과를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.log("분석 결과 불러오기 실패:", error);
        setAnalysisSummary("분석 결과를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  return (
    <ScreenWrapper>
      <S.TitleContainer>
        <S.TitleText>AI 분석 결과 🧐</S.TitleText>
      </S.TitleContainer>

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#a5d6a7" />
          <Text style={{ marginTop: 16, fontSize: 16, color: "#666" }}>
            분석 중입니다...
          </Text>
        </View>
      ) : (
        <>
          <View style={{ height: 520 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
              <S.ResultBox>
                <S.ResultText>{analysisSummary}</S.ResultText>
              </S.ResultBox>
            </ScrollView>
          </View>
          <ButtonCommon text="영양제 추천 받기" navigateTo="RecommendView" />
        </>
      )}
    </ScreenWrapper>
  );
};

export default AnalysisResultView;
