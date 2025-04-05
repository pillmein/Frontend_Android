import { useEffect, useState } from "react";
import {
  ScreenWrapper,
  ButtonBack,
  ButtonCommon,
  AlarmTimeCard,
  AlarmSaveModal,
} from "../../../components";
import * as S from "./RecommendAlarmTime.style";
import apiSO from "../../../api/apiSO";
import apiSR from "../../../api/apiSR";
import { ActivityIndicator, View, Text } from "react-native";

const RecommendAlarmTimeView = ({ route }: any) => {
  const supplementId = route?.params?.supplementId;
  const supplementName = route?.params?.supplementName;
  const [recommendedTimes, setRecommendedTimes] = useState<
    { time: string; repeatType: string }[]
  >([]);
  const [advice, setAdvice] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("supplementId:", supplementId);
    console.log("supplementName:", supplementName);
    fetchRecommendedTime();
  }, []);

  const fetchRecommendedTime = async () => {
    let success = false;
    try {
      const response = await apiSR.get(
        `/api/v1/intakes/recommended-time/${supplementId}`
      );
      console.log(response.data?.data);
      const { recommendedTime, advice } = response.data?.data || {};

      setRecommendedTimes([{ time: recommendedTime, repeatType: "매일 반복" }]);

      setAdvice(advice);
      success = true;
    } catch (error: any) {
      if (error.response?.status === 404) {
        try {
          const fallbackRes = await apiSO.post(`/timing/supplement-timing`, {
            supplementId,
          });
          const { optimalTimeFormatted, advice } = fallbackRes.data;
          console.log(fallbackRes.data);

          setRecommendedTimes([
            {
              time: optimalTimeFormatted,
              repeatType: "매일 반복",
            },
          ]);
          setAdvice(advice);
          success = true;
        } catch (fallbackError: any) {
          console.log(
            "알림 시간 추천 실패:",
            fallbackError.response?.data || fallbackError.message
          );
        }
      } else {
        console.log(
          "추천 알림 시간 조회 실패:",
          error.response?.data || error.message
        );
      }
    }
    if (!success) {
      setAdvice("추천된 복용 시간을 가져오지 못했어요.");
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    const selected = recommendedTimes[0];
    if (!selected) return;

    try {
      const requestBody = {
        supplementId,
        alarmTime: selected.time,
        repeatType: "DAILY",
      };

      const response = await apiSR.post("/api/v1/intakes/alarm", requestBody);
      console.log("알람 저장 성공:", response.data);
      setModalVisible(true);
    } catch (error: any) {
      console.log("알람 저장 실패:", error.response?.data || error.message);
    }
  };

  return (
    <ScreenWrapper>
      <S.Header>
        <ButtonBack />
        <S.Title>{supplementName}</S.Title>
      </S.Header>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#a5d6a7" />
          <Text style={{ marginTop: 16, fontSize: 16, color: "#666" }}>
            추천 시간 분석 중입니다...
          </Text>
        </View>
      ) : (
        <>
          <S.SubTitle>추천 복용 시간</S.SubTitle>
          <S.Description>{advice}</S.Description>

          <S.ListContainer>
            {recommendedTimes.length > 0 && (
              <AlarmTimeCard
                alarmTime={recommendedTimes[0].time}
                repeatType={recommendedTimes[0].repeatType}
                mode="recommend"
                isSelected={true}
                onPress={() => {}}
              />
            )}
          </S.ListContainer>
          <ButtonCommon
            text="추천된 시간으로 알림 받기"
            onPress={handleSubmit}
          />
        </>
      )}

      <AlarmSaveModal
        visible={modalVisible}
        onConfirm={() => setModalVisible(false)}
      />
    </ScreenWrapper>
  );
};

export default RecommendAlarmTimeView;
