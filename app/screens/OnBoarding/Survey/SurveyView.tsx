import { useState } from "react";
import { FlatList, Alert } from "react-native";
import * as S from "./Survey.style";
import Header from "../../../components/Header";

const surveyData = [
  {
    id: 1,
    category: "생활습관",
    question:
      "걷기/달리기/자전거 타기 등 야외 활동 \n또는 근력 운동과 같은 심박수를 높이는 \n신체 활동을 얼마나 자주 하나요?",
    description: "신체 활동 부족 시 \n체력 저하, 면역력 저하 가능성이 있어요",
    options: ["매일", "주 2~3회", "주 1회", "거의 하지 않음"],
  },
  {
    id: 2,
    category: "생활습관",
    question: "앉아서 보내는 시간이\n하루에 몇 시간 정도인가요?",
    description: "근골격계 문제, 혈액순환 장애와 관련 있어요",
    options: ["2시간 미만", "2~4시간", "4~8시간", "8시간 이상"],
  },
  {
    id: 3,
    category: "생활습관",
    question: "일일 수면 시간은 몇 시간 정도인가요?",
    description: "수면 시간이 부족하면 \n특정 영양소가 더 필요할 수 있어요",
    options: ["4시간 미만", "4~6시간", "6~8시간", "8시간 이상"],
  },
  {
    id: 4,
    category: "생활습관",
    question: "하루에 스마트폰과 컴퓨터를 \n평균 몇 시간 정도 사용하나요?",
    description: "피로, 눈 건강 문제와 관련 있어요",
    options: ["1시간 미만", "1~3시간", "3~5시간", "5시간 이상"],
  },
  {
    id: 5,
    category: "생활습관",
    question: "카페인을 얼마나 자주 섭취하나요?",
    description:
      "카페인을 자주 섭취하면\n탈수, 피로, 피부 건조 가능성이 있어요",
    options: ["섭취하지 않음", "주 1~2회", "주 3~4회", "매일 1회 이상"],
  },
  {
    id: 6,
    category: "생활습관",
    question: "평소 식사는 주로 어떤 방식으로 하나요?",
    description: "영양소 불균형, 혈당 스파이크와 관련 있어요",
    options: [
      "하루 세 끼 규칙적으로 식사",
      "하루 1-2끼 불규칙하게 식사",
      "끼니를 거르고 간식으로 대체",
      "배달음식이나 외식으로 끼니 해결",
    ],
  },
  {
    id: 7,
    category: "생활습관",
    question: "한 달 평균 음주 빈도는 어떻게 되나요?",
    description:
      "간 기능 저하, 비타민 B군 결핍, 산화 스트레스 증가와 관련 있어요",
    options: [
      "전혀 마시지 않음",
      "월 1-2회",
      "주 1-2회 (월 4-8회)",
      "주 3회 이상 (월 9회 이상)",
    ],
  },
  {
    id: 8,
    category: "건강고민",
    question: "육체적 피로감을 얼마나 자주 느끼나요?",
    description: "만성 피로, 빈혈, 수면 문제와 관련 있어요",
    options: ["해당 사항 없음", "가끔 느낌", "자주 느낌", "매우 자주 느낌"],
  },
  {
    id: 9,
    category: "건강고민",
    question:
      "최근 스트레스나 불안감을 강하게 \n느낀 적이 얼마나 자주 있었나요?",
    description:
      "스트레스로 인한 피로, 집중력 저하, \n면역력 저하와 관련 있어요",
    options: ["해당 사항 없음", "가끔 느낌", "자주 느낌", "매우 자주 느낌"],
  },
  {
    id: 10,
    category: "건강고민",
    question: "소화가 잘 안 되거나 속이 더부룩한 \n증상을 느낀 적이 있나요?",
    description: "소화 기능 저하, 위장 문제와 관련 있어요",
    options: ["해당 사항 없음", "가끔 느낌", "자주 느낌", "매우 자주 느낌"],
  },
  {
    id: 11,
    category: "건강고민",
    question: "머리가 아프거나, 어지러움을 \n자주 느끼나요?",
    description: "빈혈, 저혈압, 탈수 가능성이 있어요",
    options: ["해당 사항 없음", "가끔 느낌", "자주 느낌", "매우 자주 느낌"],
  },
  {
    id: 12,
    category: "건강고민",
    question: "감기나 염증반응이 얼마나 자주 생기나요?",
    description: "면역력 저하 가능성이 있어요",
    options: ["해당 사항 없음", "1년에 1~2번", "1년에 3~4번", "1년에 4번 이상"],
  },
  {
    id: 13,
    category: "건강고민",
    question: "어떤 피부 고민이 있으신가요?",
    description: "각 피부 유형에 따라 필요한 영양소가 상이해요",
    options: [
      "해당 사항 없음",
      "탄력 및 보습",
      "여드름성",
      "아토피",
      "색소침착",
    ],
  },
  {
    id: 14,
    category: "건강고민",
    question: "최근 체중 변화(증가 또는 감소)가 있나요?",
    description: "호르몬 불균형, 영양 불균형과 관련 있어요",
    options: [
      "해당 사항 없음",
      "가벼운 변화가 있음",
      "급격한 변화가 있음",
      "자주 있음",
    ],
  },
  {
    id: 15,
    category: "건강고민",
    question: "현재 다이어트 중이시라면, 어떤 방식으로 다이어트를 하고 있나요?",
    description: "식이제한형, 단식, 운동에 따라 \n필요한 영양소가 상이해요",
    options: [
      "해당 사항 없음",
      "식이제한형",
      "단식이나 하루 한끼 식사",
      "운동 중심",
    ],
  },
  {
    id: 16,
    category: "건강고민",
    question: "수면 중 뒤척이거나 깨는 날이 있나요?",
    description: "수면 장애, 스트레스, 호르몬 문제와 관련 있어요",
    options: ["해당 사항 없음", "가끔 있음", "자주 있음", "매우 자주 있음"],
  },
  {
    id: 17,
    category: "건강고민",
    question:
      "계절 변화에 따라 손발이 차거나, \n몸이 무거워지는 느낌이 있나요?",
    description: "혈액순환 문제, 비타민 D 결핍, 저체온증과 관련 있어요",
    options: ["해당 사항 없음", "가끔 느낌", "자주 느낌", "매우 자주 느낌"],
  },
  {
    id: 18,
    category: "건강고민",
    question: "평소 시력이 저하되거나 \n눈이 피로해진 적이 있나요?",
    description: "눈의 피로, 시력 저하, 안구 건조증과 관련 있어요",
    options: ["해당 사항 없음", "가끔 있음", "자주 있음", "매우 자주 있음"],
  },
  {
    id: 19,
    category: "건강고민",
    question: "신체 특정 부위에 통증(근육통, 관절통, 염증 등)이 자주 있나요?",
    description: "근육통, 관절통, 만성 염증 가능성이 있어요",
    options: ["해당 사항 없음", "가끔 있음", "자주 있음", "매우 자주 있음"],
  },
  {
    id: 20,
    category: "건강고민",
    question:
      "최근 집중력이 저하되거나 기억력이 저하되는 것을 느낀 적이 있나요?",
    description: "집중력, 인지 기능 저하와 관련 있어요",
    options: ["해당 사항 없음", "가끔 있음", "자주 있음", "매우 자주 있음"],
  },
  {
    id: 21,
    category: "건강고민",
    question: "손톱이 부러지거나 머리카락이 약해진 걸 느낀 적이 있나요?",
    description: "영양 부족 가능성이 있어요",
    options: ["해당 사항 없음", "가끔 있음", "자주 있음", "매우 자주 있음"],
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
      navigation.navigate("SurveySupplementView");
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
