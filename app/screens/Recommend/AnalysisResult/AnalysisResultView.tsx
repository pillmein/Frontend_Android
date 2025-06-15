import { ScreenWrapper, ButtonCommon } from "../../../components";
import * as S from "./AnalysisResult.style";
import apiSO from "../../../api/apiSO";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, ScrollView } from "react-native";

const AnalysisResultView = ({ navigation }: any) => {
  const [analysisSummary, setAnalysisSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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
          <View style={{ height: 450 }}>
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
