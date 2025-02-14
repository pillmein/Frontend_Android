import { useState } from "react";
import { FlatList, Alert } from "react-native";
import * as S from "./Survey.style";
import Header from "../../../components/Header";

//임시 데이터
const surveyData = [
  {
    id: 1,
    category: "생활습관",
    question: "일일 수면 시간은 몇 시간 정도인가요?",
    description: "수면 시간이 부족하면 \n특정 영양소가 더 필요할 수 있어요",
    options: ["4시간 이하", "5~6시간", "7~8시간", "8시간 이상"],
  },
  {
    id: 2,
    category: "생활습관",
    question: "심박수를 높이는 신체 활동을 \n얼마나 자주 하나요?",
    description: "운동 부족 시 면역력 저하 가능성이 있어요",
    options: ["거의 안 함", "주 1~2회", "주 3~5회", "매일"],
  },
  {
    id: 3,
    category: "건강고민",
    question: "육체적 피로감을 얼마나 자주 느끼나요?",
    description: "만성 피로, 빈혈, 수면 문제와 관련있어요",
    options: ["해당 사항 없음", "가끔 느낌", " 자주 느낌", "매우 자주 느낌"],
  },
  {
    id: 4,
    category: "건강고민",
    question: "최근 스트레스나 불안감을 강하게 느낀 적이 얼마나 자주 있었나요?",
    description: "스트레스로 인한 피로, 집중력 저하, 면역력 저하와 관련있어요",
    options: ["해당 사항 없음", "가끔 느낌", " 자주 느낌", "매우 자주 느낌"],
  },
];

const SurveyView = function ({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});

  const currentSurvey = surveyData[currentIndex];

  const handleSelect = (option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentSurvey.id]: option,
    }));
  };

  const handleNext = () => {
    if (!selectedOptions[currentSurvey.id]) {
      Alert.alert("선택 오류", "항목을 선택해주세요.");
      return;
    }

    if (currentIndex < surveyData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate("SurveyDoneView");
    }
  };
  const handleSkip = () => {
    if (currentIndex < surveyData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <S.Container>
      <Header />
      <S.SurveyContainer>
        {/* 카테고리 */}
        <S.Category>{currentSurvey.category}</S.Category>

        {/* 질문 */}
        <S.Question>{currentSurvey.question}</S.Question>
        <S.Description>{currentSurvey.description}</S.Description>

        {/* 선택지 버튼 */}
        <FlatList
          data={currentSurvey.options}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <S.OptionButton
              selected={selectedOptions[currentSurvey.id] === item}
              onPress={() => handleSelect(item)}
            >
              <S.OptionText>{item}</S.OptionText>
              {selectedOptions[currentSurvey.id] === item && (
                <S.CheckMark>✔️</S.CheckMark>
              )}
            </S.OptionButton>
          )}
        />

        {currentSurvey.category === "건강고민" && (
          <S.SkipFrame>
            <S.SkipInfoText>해당되지 않는 건강 고민이라면</S.SkipInfoText>
            <S.SkipButton onPress={handleSkip}>
              <S.SkipText>SKIP</S.SkipText>
            </S.SkipButton>
            <S.SkipInfoText>을 눌러주세요</S.SkipInfoText>
          </S.SkipFrame>
        )}
        {/* 하단 네비게이션 */}
        <S.BottomNav>
          <S.NavPrevButton disabled={currentIndex === 0} onPress={handlePrev}>
            <S.NavButtonText disabled={currentIndex === 0}>
              이전
            </S.NavButtonText>
          </S.NavPrevButton>
          <S.PageIndicator>
            {currentIndex + 1}/{surveyData.length}
          </S.PageIndicator>
          <S.NavButton onPress={handleNext}>
            <S.NavButtonText>다음</S.NavButtonText>
          </S.NavButton>
        </S.BottomNav>
      </S.SurveyContainer>
    </S.Container>
  );
};

export default SurveyView;
