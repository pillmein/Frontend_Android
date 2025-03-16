import React, { useState } from "react";
import {
  ScreenWrapper,
  ButtonBack,
  ButtonCommon,
  AlarmTimeCard,
} from "../../../components";
import * as S from "./RecommendAlarmTime.style";
import { TouchableOpacity } from "react-native";

const RecommendAlarmTimeView = ({ navigation }: any) => {
  const recommendedTimes = [
    { id: 1, time: "19:00", repeatType: "매일 반복" },
    { id: 2, time: "22:00", repeatType: "매일 반복" },
  ];
  const [selectedAlarms, setSelectedAlarms] = useState<number[]>([]);
  const toggleSelect = (id: number) => {
    setSelectedAlarms((prev) =>
      prev.includes(id)
        ? prev.filter((alarmId) => alarmId !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (selectedAlarms.length === 0) return;
    // TODO : 선택한 알람 시간으로 저장 & API 연동
    // TODO : 저장 모달창
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <S.Header>
        <ButtonBack />
        <S.Title>비맥스 메타</S.Title>
      </S.Header>

      <S.SubTitle>추천 복용 시간</S.SubTitle>
      <S.Description>
        마그네슘은 1일 1~2회{"\n"}저녁 시간이나 취침 전에 복용하는 것이 좋아요!
        {"\n"}아래 추천된 시간 중 알림을 받을 시간을 선택하세요.
      </S.Description>

      <S.ListContainer>
        {recommendedTimes.map(({ id, time, repeatType }) => (
          <AlarmTimeCard
            key={id}
            alarmTime={time}
            repeatType={repeatType}
            mode="recommend"
            isSelected={selectedAlarms.includes(id)}
            onPress={() => toggleSelect(id)}
          />
        ))}
      </S.ListContainer>

      <TouchableOpacity
        disabled={selectedAlarms.length === 0} // 비활성화
        activeOpacity={selectedAlarms.length === 0 ? 1 : 0.7}
        onPress={() => {
          if (selectedAlarms.length === 0) return;
          handleSubmit();
        }}
        style={{
          opacity: selectedAlarms.length === 0 ? 0.3 : 1,
        }}
      >
        <ButtonCommon text="선택한 시간으로 알림 받기" onPress={handleSubmit} />
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

export default RecommendAlarmTimeView;
