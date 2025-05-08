import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { parse, format } from "date-fns";
import * as S from "./AlarmTimeCard.style";

type Props = {
  alarmTime: string; // 24시간제(HH:MM)
  repeatType: string; // DAILY, EVERY_TWO_DAYS, WEEKLY
  mode: "recommend" | "edit"; // 추천 화면 / 기본설정 화면
  onPressEdit: () => void; // 카드 전체 클릭 시 (수정)
  onPressDelete?: () => void; // 삭제 아이콘 클릭 시
};

const formatTimeWithAmPm = (time: string) => {
  const parsedDate = parse(time, "HH:mm", new Date());

  return {
    ampm: format(parsedDate, "a"), // AM / PM
    hour: format(parsedDate, "hh"),
    minute: format(parsedDate, "mm"),
  };
};

const AlarmTimeCard = ({
  alarmTime,
  repeatType,
  mode,
  onPressEdit,
  onPressDelete,
}: Props) => {
  const { ampm, hour, minute } = formatTimeWithAmPm(alarmTime);

  return (
    <TouchableOpacity onPress={onPressEdit}>
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

          {mode === "edit" && onPressDelete && (
            <TouchableOpacity onPress={onPressDelete}>
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={24}
                color="#aaa"
              />
            </TouchableOpacity>
          )}
        </S.TimeRow>
      </S.CardContainer>
    </TouchableOpacity>
  );
};

export default AlarmTimeCard;
