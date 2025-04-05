import { useState } from "react";
import { FlatList, Alert, TextInput, Text } from "react-native";
import * as S from "./Survey.style";
import { FontAwesome } from "@expo/vector-icons";
import { Header, PageIndicator } from "../../../components";
import { Audio } from "expo-av";
import apiSR from "../../../api/apiSR";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { API_BASE_URL_SR, ACCESS_TOKEN } from "@env";

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

const answerCodeMap: { [key: number]: { [key: string]: string } } = {
  1: {
    매일: "DAILY",
    "주 2~3회": "WEEK_2_3",
    "주 1회": "WEEKLY",
    "거의 하지 않음": "RARELY",
  },
  2: {
    "2시간 미만": "LESS_THAN_2",
    "2~4시간": "TWO_TO_FOUR",
    "4~8시간": "FOUR_TO_EIGHT",
    "8시간 이상": "MORE_THAN_EIGHT",
  },
  3: {
    "4시간 미만": "LESS_THAN_OR_EQUAL_4",
    "4~6시간": "FIVE_TO_SIX",
    "6~8시간": "SEVEN_TO_EIGHT",
    "8시간 이상": "MORE_THAN_EIGHT",
  },
  4: {
    "1시간 미만": "LESS_THAN_1",
    "1~3시간": "ONE_TO_THREE",
    "3~5시간": "THREE_TO_FIVE",
    "5시간 이상": "MORE_THAN_5",
  },
  5: {
    "섭취하지 않음": "NEVER",
    "주 1~2회": "WEEKLY_1_2",
    "주 3~4회": "WEEKLY_3_4",
    "매일 1회 이상": "DAILY_OR_MORE",
  },
  6: {
    "하루 세 끼 규칙적으로 식사": "THREE_MEALS",
    "하루 1-2끼 불규칙하게 식사": "IRREGULAR",
    "끼니를 거르고 간식으로 대체": "SKIP_MEALS",
    "배달음식이나 외식으로 끼니 해결": "DELIVERY_OR_OUTSIDE",
  },
  7: {
    "전혀 마시지 않음": "NEVER",
    "월 1-2회": "MONTHLY_1_2",
    "주 1-2회 (월 4-8회)": "WEEKLY_1_2",
    "주 3회 이상 (월 9회 이상)": "WEEKLY_3_PLUS",
  },
  8: {
    "해당 사항 없음": "NOT_APPLICABLE",
    "가끔 느낌": "OCCASIONALLY",
    "자주 느낌": "OFTEN",
    "매우 자주 느낌": "VERY_OFTEN",
  },
  9: {
    "해당 사항 없음": "NOT_APPLICABLE",
    "가끔 느낌": "OCCASIONALLY",
    "자주 느낌": "OFTEN",
    "매우 자주 느낌": "VERY_OFTEN",
  },
  10: {
    "해당 사항 없음": "NOT_APPLICABLE",
    "가끔 느낌": "OCCASIONALLY",
    "자주 느낌": "OFTEN",
    "매우 자주 느낌": "VERY_OFTEN",
  },
  11: {
    "해당 사항 없음": "NOT_APPLICABLE",
    "가끔 느낌": "OCCASIONALLY",
    "자주 느낌": "OFTEN",
    "매우 자주 느낌": "VERY_OFTEN",
  },
  12: {
    "해당 사항 없음": "NOT_APPLICABLE",
    "1년에 1~2번": "ONCE_OR_TWICE",
    "1년에 3~4번": "THREE_TO_FOUR",
    "1년에 4번 이상": "FOUR_OR_MORE",
  },
  13: {
    "해당 사항 없음": "NOT_APPLICABLE",
    "탄력 및 보습": "MOISTURE",
    여드름성: "ACNE",
    아토피: "ATOPIC",
    색소침착: "HYPERPIGMENTATION",
  },
  14: {
    "해당 사항 없음": "NOT_APPLICABLE",
    "가벼운 변화가 있음": "SLIGHT_CHANGE",
    "급격한 변화가 있음": "RAPID_CHANGE",
    "자주 있음": "FREQUENT_CHANGE",
  },
  15: {
    "해당 사항 없음": "NOT_APPLICABLE",
    식이제한형: "DIET_RESTRICTION",
    "단식이나 하루 한끼 식사": "FASTING",
    "운동 중심": "EXERCISE_BASED",
  },
  16: {
    "해당 사항 없음": "NOT_APPLICABLE",
    "가끔 있음": "OCCASIONALLY",
    "자주 있음": "OFTEN",
    "매우 자주 있음": "VERY_OFTEN",
  },
  17: {
    "해당 사항 없음": "NOT_APPLICABLE",
    "가끔 느낌": "OCCASIONALLY",
    "자주 느낌": "OFTEN",
    "매우 자주 느낌": "VERY_OFTEN",
  },
  18: {
    "해당 사항 없음": "NOT_APPLICABLE",
    "가끔 있음": "OCCASIONALLY",
    "자주 있음": "OFTEN",
    "매우 자주 있음": "VERY_OFTEN",
  },
  19: {
    "해당 사항 없음": "NOT_APPLICABLE",
    "가끔 있음": "OCCASIONALLY",
    "자주 있음": "OFTEN",
    "매우 자주 있음": "VERY_OFTEN",
  },
  20: {
    "해당 사항 없음": "NOT_APPLICABLE",
    "가끔 있음": "OCCASIONALLY",
    "자주 있음": "OFTEN",
    "매우 자주 있음": "VERY_OFTEN",
  },
  21: {
    "해당 사항 없음": "NOT_APPLICABLE",
    "가끔 있음": "OCCASIONALLY",
    "자주 있음": "OFTEN",
    "매우 자주 있음": "VERY_OFTEN",
  },
};

const fieldKeyMap: { [key: number]: string } = {
  1: "outdoorActivity",
  2: "sedentaryHours",
  3: "sleepDuration",
  4: "screenTime",
  5: "caffeineIntake",
  6: "mealPattern",
  7: "alcoholFrequency",
  8: "physicalFatigue",
  9: "mentalFatigue",
  10: "digestionIssues",
  11: "headacheDizziness",
  12: "infectionFrequency",
  13: "skinConcern",
  14: "weightChange",
  15: "dietMethod",
  16: "sleepDisruption",
  17: "seasonalDiscomfort",
  18: "eyeFatigue",
  19: "painFrequency",
  20: "focusMemoryIssues",
  21: "brittleNailsHair",
};

const SurveyView = function ({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});
  const [subjectiveAnswer, setSubjectiveAnswer] = useState("");
  const [isSubjectiveAnswered, setIsSubjectiveAnswered] = useState(false);

  const currentSurvey = surveyData[currentIndex];

  const [recording, setRecording] = useState<Audio.Recording>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const handleSelect = (option: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [currentSurvey.id]: option,
    }));
  };

  const handleSubmitSurvey = async () => {
    const mappedResult: { [key: string]: string } = {};

    Object.entries(selectedOptions).forEach(([idStr, answer]) => {
      const id = Number(idStr);
      const key = fieldKeyMap[id];
      const code = answerCodeMap[id]?.[answer];

      if (key && code) {
        mappedResult[key] = code;
      }
    });

    mappedResult["healthPurpose"] = subjectiveAnswer;

    try {
      const response = await apiSR.put(
        "/api/v1/users/survey-answers",
        mappedResult
      );
      console.log("응답 성공:", response.data);
      navigation.navigate("SurveySupplementView");
    } catch (e: any) {
      console.error("에러:", e.response?.data || e.message);
    }
  };

  const handleNext = () => {
    if (currentIndex > surveyData.length - 1) {
      handleSubmitSurvey();
    } else {
      if (!selectedOptions[currentSurvey.id]) {
        Alert.alert("선택 오류", "항목을 선택해주세요.");
        return;
      }
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleInputText = (newText: string) => {
    setSubjectiveAnswer(newText);
    setIsSubjectiveAnswered(newText.length > 0);
  };

  const startRecording = async () => {
    try {
      if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async (): Promise<void> => {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording?.getURI();
    console.log("Recording stopped and stored at", uri);

    if (!uri) return;

    const formData = new FormData();
    formData.append("voiceFile", {
      uri,
      name: "audio.m4a",
      type: "audio/m4a",
    } as any);

    try {
      const response = await axios.post(
        `${API_BASE_URL_SR}/api/v1/speech-to-text`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      const recognizedText = response.data.data.recognizedText;
      console.log("음성 인식 성공:", recognizedText);

      setSubjectiveAnswer(recognizedText);
      setIsSubjectiveAnswered(true);
    } catch (err: any) {
      console.error("음성 업로드 실패:", err.response?.data || err.message);
    }

    setRecording(undefined);
    await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
  };

  return (
    <S.Container>
      <Header />
      {currentIndex > surveyData.length - 1 ? (
        <>
          <S.SurveyContainer>
            {/* 주관식 문항 처리 */}
            <S.Question>
              영양제로 어떤 부분을{"\n"}
              <Text style={{ color: "#a5d6a7" }}>가장</Text> 보충하고
              싶으신가요?
            </S.Question>
            <S.Description textColor="black">
              영양제를 섭취하는 목적이나 해소하고 싶은 증상을{"\n"}알려주시면
              맞춤 추천에 도움이 됩니다 😊
            </S.Description>
            <S.Description>
              <Text style={{ backgroundColor: "#a5d6a760" }}>텍스트</Text> 또는{" "}
              <Text style={{ backgroundColor: "#a5d6a760" }}>음성</Text>으로
              편하게 말씀하세요!
            </S.Description>
            <>
              <TextInput
                placeholder="예) 요즘 스트레스가 많아서 잠을 잘 못 자고 피곤함이 계속 쌓이는 것 같아, 
면역력을 높이고 감기를 덜 걸리고 싶어"
                value={subjectiveAnswer}
                onChangeText={handleInputText}
                multiline
                style={{
                  fontSize: 15,
                  height: 200,
                  borderColor: "#d9d9d9",
                  borderRadius: 20,
                  borderWidth: 1,
                  padding: 20,
                  lineHeight: 20,
                }}
                selectionColor={"#a5d6a7"}
              />
              <S.VoiceInputButton
                onPress={recording ? stopRecording : startRecording}
              >
                {recording ? (
                  <FontAwesome name="stop" size={24} color="white" />
                ) : (
                  <FontAwesome name="microphone" size={24} color="white" />
                )}
              </S.VoiceInputButton>
            </>
          </S.SurveyContainer>
          <S.BottomNav>
            <S.NavPrevButton disabled={currentIndex === 0} onPress={handlePrev}>
              <S.NavButtonText disabled={currentIndex === 0}>
                이전
              </S.NavButtonText>
            </S.NavPrevButton>
            <S.NavButton
              onPress={handleNext}
              style={{
                backgroundColor: isSubjectiveAnswered ? "#a5d6a7" : "white",
                borderWidth: 1,
                borderColor: isSubjectiveAnswered ? "#a5d6a7" : "#ddd",
              }}
            >
              <S.NavButtonText
                style={{
                  color: isSubjectiveAnswered ? "white" : "#aaa",
                }}
              >
                {isSubjectiveAnswered ? "다음" : "skip"}
              </S.NavButtonText>
            </S.NavButton>
          </S.BottomNav>
        </>
      ) : (
        <>
          {/* 객관식 문항 처리 */}
          <S.SurveyContainer>
            <S.Category>{currentSurvey.category}</S.Category>
            <S.Question>{currentSurvey.question}</S.Question>
            <S.Description>{currentSurvey.description}</S.Description>

            {currentSurvey.options && currentSurvey.options.length > 0 && (
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
            )}
          </S.SurveyContainer>
          {/* 하단 네비게이션 */}
          <S.BottomNav>
            <S.NavPrevButton disabled={currentIndex === 0} onPress={handlePrev}>
              <S.NavButtonText disabled={currentIndex === 0}>
                이전
              </S.NavButtonText>
            </S.NavPrevButton>
            <PageIndicator
              currentIndex={currentIndex}
              surveyData={surveyData}
            />
            <S.NavButton onPress={handleNext}>
              <S.NavButtonText>다음</S.NavButtonText>
            </S.NavButton>
          </S.BottomNav>
        </>
      )}
    </S.Container>
  );
};

export default SurveyView;
