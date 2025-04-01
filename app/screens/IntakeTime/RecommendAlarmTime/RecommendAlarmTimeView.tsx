import React, { useState } from "react";
import {
  ScreenWrapper,
  ButtonBack,
  ButtonCommon,
  AlarmTimeCard,
  AlarmSaveModal,
} from "../../../components";
import * as S from "./RecommendAlarmTime.style";

const RecommendAlarmTimeView = () => {
  const recommendedTimes = [{ id: 1, time: "19:00", repeatType: "매일 반복" }];
  const [selectedAlarms, setSelectedAlarms] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSelect = (id: number) => {
    setSelectedAlarms((prev) =>
      prev.includes(id)
        ? prev.filter((alarmId) => alarmId !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = () => {
    // TODO : 선택한 알람 시간으로 저장 & API 연동
    setModalVisible(true);
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
      <ButtonCommon text="추천된 시간으로 알림 받기" onPress={handleSubmit} />

      <AlarmSaveModal
        visible={modalVisible}
        onConfirm={() => setModalVisible(false)}
      />
    </ScreenWrapper>
  );
};

export default RecommendAlarmTimeView;
