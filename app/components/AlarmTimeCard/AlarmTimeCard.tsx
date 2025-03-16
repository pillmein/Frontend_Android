import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import * as S from "./AlarmTimeCard.style";

type Props = {
  alarmTime: string; // 24시간제(HH:MM)
  repeatType: string; // DAILY, EVERY_TWO_DAYS, WEEKLY
  mode: "recommend" | "edit"; // 추천 화면 / 기본설정 화면
  isSelected?: boolean; // 추천에서 선택 상태
  onPress: () => void; // 추천 선택 or 삭제
};

const formatTimeWithAmPm = (time: string) => {
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10);

  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  if (hour === 0) hour = 12;

  return {
    ampm,
    hour: hour.toString().padStart(2, "0"),
    minute,
  };
};

const AlarmTimeCard = ({
  alarmTime,
  repeatType,
  mode,
  isSelected = false,
  onPress,
}: Props) => {
  const { ampm, hour, minute } = formatTimeWithAmPm(alarmTime);

  return (
    <S.CardContainer>
      {/* 반복 타입 예: 매일 반복 */}
      <S.RepeatTypeText>{repeatType}</S.RepeatTypeText>

      <S.TimeRow>
        <S.TimeTextContainer>
          <S.AmPmText>{ampm}</S.AmPmText>
          <S.HourText>{hour}</S.HourText>
          <S.ColonText>:</S.ColonText>
          <S.MinuteText>{minute}</S.MinuteText>
        </S.TimeTextContainer>

        <TouchableOpacity onPress={onPress}>
          {mode === "recommend" ? (
            isSelected ? (
              <Feather name="check-circle" size={24} color="#a5d6a7" />
            ) : (
              <Feather name="circle" size={24} color="#ddd" />
            )
          ) : (
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={24}
              color="#aaa"
            />
          )}
        </TouchableOpacity>
      </S.TimeRow>
    </S.CardContainer>
  );
};

export default AlarmTimeCard;
