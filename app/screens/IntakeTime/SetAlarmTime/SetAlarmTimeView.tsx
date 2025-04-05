import {
  ButtonCommon,
  ScreenWrapper,
  ButtonBack,
  AlarmTimeCard,
} from "../../../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AlarmModal from "../../../components/Modal/AlarmModal";
import * as S from "./SetAlarmTime.style";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import apiSR from "../../../api/apiSR";
import { useRoute } from "@react-navigation/native";

type AlarmItem = {
  alarmId: number;
  time: string;
  repeatType: string;
};

const SetAlarmTimeView = ({ navigation }: any) => {
  const route = useRoute();
  const { supplementId } = route.params as { supplementId: number };
  const [supplementName, setSupplementName] = useState("");
  const [alarm, setAlarm] = useState<AlarmItem[]>([]);
  const [isPickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    fetchAlarmData();
  }, []);

  const fetchAlarmData = async () => {
    try {
      const response = await apiSR.get(`/api/v1/intakes/alarm/${supplementId}`);
      const { supplementName, alarmTimes } = response.data.data;

      setSupplementName(supplementName);
      setAlarm(alarmTimes);

      console.log("알림 조회 :", response.data.data);
    } catch (error: any) {
      console.log("알림 조회 실패:", error.response?.data || error.message);
    }
  };

  const handleAddAlarm = () => {
    console.log("알림 추가하기");
    setPickerVisible(true);
  };

  const handleDeleteAlarm = (alarmId: number) => {
    setAlarm((prev) => prev.filter((alarm) => alarm.alarmId !== alarmId));
  };

  const getRepeatTypeLabel = (repeatType: string) => {
    switch (repeatType) {
      case "DAILY":
        return "매일 반복";
      case "EVERY_TWO_DAYS":
        return "2일 간격 반복";
      case "WEEKLY":
        return "일주일마다 반복";
      default:
        return "반복 없음";
    }
  };

  return (
    <ScreenWrapper>
      <S.Header>
        <ButtonBack />
        <S.Title>{supplementName}</S.Title>
      </S.Header>

      {alarm?.length === 0 ? (
        <>
          <S.EmptyAlarmContainer>
            <MaterialCommunityIcons name="clock" size={75} color="#a5d6a7" />
            <S.EmptyAlarmText>
              아직 설정된 알림이 없어요.{"\n"}최적의 복용 시간을 추천받아
              볼까요?
            </S.EmptyAlarmText>
          </S.EmptyAlarmContainer>
          <ButtonCommon
            style={{ bottom: 70 }}
            text="네, 추천 받을게요!"
            onPress={() => {
              console.log("navigate params:", supplementId, supplementName);
              navigation.navigate("RecommendAlarmTimeView", {
                supplementId,
                supplementName,
              });
            }}
          />
          <S.Button onPress={handleAddAlarm}>
            <S.ButtonText>아니요, 직접 설정할게요.</S.ButtonText>
          </S.Button>
        </>
      ) : (
        <>
          <View style={{ height: 480 }}>
            <FlatList
              data={alarm}
              keyExtractor={(item) => item.alarmId.toString()}
              renderItem={({ item }) => (
                <AlarmTimeCard
                  alarmTime={item.time}
                  repeatType={getRepeatTypeLabel(item.repeatType)}
                  mode="edit"
                  onPress={() => handleDeleteAlarm(item.alarmId)}
                />
              )}
              showsVerticalScrollIndicator={true}
            />
          </View>
          <ButtonCommon
            style={{ bottom: 70 }}
            text="복용 시간 추천 받기"
            onPress={() => {
              navigation.navigate("RecommendAlarmTimeView", {
                supplementId,
                supplementName,
              });
            }}
          />
          <S.AddAlarmButton onPress={handleAddAlarm}>
            <S.AddAlarmButtonText>알림 직접 설정하기</S.AddAlarmButtonText>
          </S.AddAlarmButton>
        </>
      )}

      <AlarmModal
        visible={isPickerVisible}
        onClose={() => setPickerVisible(false)}
        onSave={async (time, repeat) => {
          // 1. 시간 포맷을 24시간제 문자열로 변환
          const hour = time.getHours().toString().padStart(2, "0");
          const minute = time.getMinutes().toString().padStart(2, "0");
          const formattedTime = `${hour}:${minute}`;

          try {
            // 2. 서버에 알림 저장 요청
            const response = await apiSR.post("/api/v1/intakes/alarm", {
              supplementId,
              alarmTime: formattedTime,
              repeatType: repeat,
            });

            // 3. 저장 성공 후 최신 알림 목록 불러오기
            await fetchAlarmData();
            console.log("알림 저장 후 목록 갱신 완료");
          } catch (error: any) {
            console.error(
              "알림 저장 실패:",
              error.response?.data || error.message
            );
          }

          // 4. 모달 닫기
          setPickerVisible(false);
        }}
      />
    </ScreenWrapper>
  );
};

export default SetAlarmTimeView;
