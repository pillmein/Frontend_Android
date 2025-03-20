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
          {/* 알림 카드 목록 */}
          <S.AlarmListContainer>
            {alarms.map((alarm) => (
              <AlarmTimeCard
                key={alarm.alarmId}
                alarmTime={alarm.time}
                repeatType="매일 반복"
                mode="edit"
                onPress={() => handleDeleteAlarm(alarm.alarmId)}
              />
            ))}
          </S.AlarmListContainer>

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
              console.log("저장됨", time, repeat);
              setPickerVisible(false);
            }}
          />
        </>
      )}
    </ScreenWrapper>
  );
};

export default SetAlarmTimeView;
