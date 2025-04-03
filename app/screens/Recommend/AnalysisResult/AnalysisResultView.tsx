import { ScreenWrapper, ButtonCommon } from "../../../components";
import * as S from "./AnalysisResult.style";
import apiSO from "../../../api/apiSO";
import { useEffect, useState } from "react";

const AnalysisResultView = ({ navigation }: any) => {
  const [analysisSummary, setAnalysisSummary] = useState<string>("");

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
      }
    };

    fetchAnalysis();
  }, []);

  return (
    <ScreenWrapper>
      <S.TitleContainer>
        <S.TitleText>AI 분석 결과 🧐</S.TitleText>
      </S.TitleContainer>

      <S.ResultBox>
        <S.ResultText>{analysisSummary}</S.ResultText>
      </S.ResultBox>
      <ButtonCommon text="영양제 추천 받기" navigateTo="RecommendView" />
    </ScreenWrapper>
  );
};

export default AnalysisResultView;
