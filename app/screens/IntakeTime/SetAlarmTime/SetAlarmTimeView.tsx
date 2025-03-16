import { ButtonCommon, ScreenWrapper, ButtonBack } from "../../../components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as S from "./SetAlarmTime.style";

const SetAlarmTimeView = ({ navigation }: any) => {
  // TODO : API 연동
  //   const alarms = {
  //     supplementId: 10,
  //     supplementName: "비맥스 메타",
  //     alarmTimes: [
  //       {
  //         alarmId: 1,
  //         time: "10:00",
  //         repeatType: "DAILY",
  //       },
  //     ],
  //   };

  //알림 없는 경우
  const alarms = {
    supplementId: 10,
    supplementName: "비맥스 메타",
    alarmTimes: [],
  };

  return (
    <ScreenWrapper>
      <S.Header>
        <ButtonBack />
        <S.Title>{alarms.supplementName}</S.Title>
      </S.Header>

      {alarms.alarmTimes.length === 0 ? (
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
          <ButtonCommon
            text="복용 시간 추천 받기"
            navigateTo="RecommendAlarmTimeView"
          />
          <S.Button>
            <S.ButtonText>알림 직접 설정하기</S.ButtonText>
          </S.Button>
        </>
      )}
    </ScreenWrapper>
  );
};

export default SetAlarmTimeView;
