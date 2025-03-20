import {
  ButtonCommon,
  ScreenWrapper,
  ButtonBack,
  AlarmTimeCard,
} from "../../../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AlarmModal from "../../../components/Modal/AlarmModal";
import * as S from "./SetAlarmTime.style";
import { useState } from "react";
import { FlatList } from "react-native";

const SetAlarmTimeView = ({ navigation }: any) => {
  // TODO : API 연동
  const alarmsdata = {
    supplementId: 10,
    supplementName: "비맥스 메타",
    alarmTimes: [
      {
        alarmId: 1,
        time: "10:00",
        repeatType: "DAILY",
      },
      {
        alarmId: 2,
        time: "18:00",
        repeatType: "DAILY",
      },
    ],
  };

  //알림 없는 경우
  // const alarms = {
  //   supplementId: 10,
  //   supplementName: "비맥스 메타",
  //   alarmTimes: [],
  // };

  const [alarms, setAlarms] = useState(alarmsdata.alarmTimes);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleAddAlarm = () => {
    setPickerVisible(true);
  };

  const handleDeleteAlarm = (alarmId: number) => {
    setAlarms((prev) => prev.filter((alarm) => alarm.alarmId !== alarmId));
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
        <S.Title>{alarmsdata.supplementName}</S.Title>
      </S.Header>

      {alarmsdata.alarmTimes.length === 0 ? (
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
            data={alarms}
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

              // 3. 기존 alarms에 추가, 시간 순으로 정렬
              setAlarms((prev) => {
                const updatedAlarms = [...prev, newAlarm];
                updatedAlarms.sort((a, b) => {
                  const [aHour, aMinute] = a.time.split(":").map(Number);
                  const [bHour, bMinute] = b.time.split(":").map(Number);

                  if (aHour !== bHour) return aHour - bHour;
                  return aMinute - bMinute;
                });

                return updatedAlarms;
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
