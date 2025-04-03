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
import { FlatList } from "react-native";
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

  // // TODO : API 연동
  // const alarmdata = {
  //   supplementId: 10,
  //   supplementName: "비맥스 메타",
  //   alarmTimes: [
  //     {
  //       alarmId: 1,
  //       time: "10:00",
  //       repeatType: "DAILY",
  //     },
  //     {
  //       alarmId: 2,
  //       time: "18:00",
  //       repeatType: "DAILY",
  //     },
  //   ],
  // };

  //알림 없는 경우
  // const alarm = {
  //   supplementId: 10,
  //   supplementName: "비맥스 메타",
  //   alarmTimes: [],
  // };

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

      console.log("알람 조회 :", response.data.data);
    } catch (error: any) {
      console.log("알람 조회 실패:", error.response?.data || error.message);
    }
  };

  const handleAddAlarm = () => {
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
            text="네, 추천 받을게요!"
            navigateTo="RecommendAlarmTimeView"
          />
          <S.Button>
            <S.ButtonText>아니요, 직접 설정할게요.</S.ButtonText>
          </S.Button>
        </>
      ) : (
        <>
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

          <ButtonCommon
            text="복용 시간 추천 받기"
            navigateTo="RecommendAlarmTimeView"
          />
          <S.AddAlarmButton onPress={handleAddAlarm}>
            <S.AddAlarmButtonText>알림 직접 설정하기</S.AddAlarmButtonText>
          </S.AddAlarmButton>
          <AlarmModal
            visible={isPickerVisible}
            onClose={() => setPickerVisible(false)}
            onSave={(time, repeat) => {
              // 1. 시간 포맷을 24시간제 문자열로 변환
              const hour = time.getHours().toString().padStart(2, "0");
              const minute = time.getMinutes().toString().padStart(2, "0");
              const formattedTime = `${hour}:${minute}`;

              // 2. 새로운 알람 객체 생성
              const newAlarm = {
                alarmId: Date.now(), // 임시 고유 ID //TODO: 나중에 서버에서 알림 ID 넘겨주면 교체
                time: formattedTime,
                repeatType: repeat,
              };

              // 3. 기존 alarm에 추가, 시간 순으로 정렬
              setAlarm((prev) => {
                const updatedAlarm = [...prev, newAlarm];
                updatedAlarm.sort((a, b) => {
                  const [aHour, aMinute] = a.time.split(":").map(Number);
                  const [bHour, bMinute] = b.time.split(":").map(Number);

                  if (aHour !== bHour) return aHour - bHour;
                  return aMinute - bMinute;
                });

                return updatedAlarm;
              });

              console.log("저장된 시간:", formattedTime, repeat);
              // 4. 모달 닫기
              setPickerVisible(false);
            }}
          />
        </>
      )}
    </ScreenWrapper>
  );
};

export default SetAlarmTimeView;
