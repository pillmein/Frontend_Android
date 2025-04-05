import { useState } from "react";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import styled from "styled-components/native";

type AlarmModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (time: Date, repeatType: string) => void;
  initialTime?: Date;
  initialRepeatType?: string;
};

const repeatOptions = [
  { label: "매일 반복", value: "DAILY" },
  { label: "2일 간격 반복", value: "EVERY_TWO_DAYS" },
  { label: "일주일마다 반복", value: "WEEKLY" },
];

const AlarmModal = ({
  visible,
  onClose,
  onSave,
  initialTime = new Date(),
  initialRepeatType = "DAILY",
}: AlarmModalProps) => {
  const [selectedTime, setSelectedTime] = useState<Date>(initialTime);
  const [repeatType, setRepeatType] = useState(initialRepeatType);

  const handleSave = () => {
    onSave(selectedTime, repeatType);
    onClose();
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={["down"]}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      useNativeDriver={true}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <Content>
        <Header>
          <HeaderButton onPress={onClose}>
            <HeaderButtonText color="#a5d6a7">취소</HeaderButtonText>
          </HeaderButton>
          <HeaderTitle>알림 추가</HeaderTitle>
          <HeaderButton onPress={handleSave}>
            <HeaderButtonText color="#a5d6a7">저장</HeaderButtonText>
          </HeaderButton>
        </Header>

        <PickerWrapper>
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display={"spinner"}
            locale="ko-KR"
            is24Hour={false}
            onChange={(e, date) => {
              if (date) setSelectedTime(date);
            }}
            style={{
              width: "100%",
              backgroundColor: "#fff",
            }}
          />
        </PickerWrapper>

        <RepeatOptions>
          {repeatOptions.map((option) => (
            <RepeatButton
              key={option.value}
              selected={repeatType === option.value}
              onPress={() => setRepeatType(option.value)}
            >
              <RepeatButtonText selected={repeatType === option.value}>
                {option.label}
              </RepeatButtonText>
            </RepeatButton>
          ))}
        </RepeatOptions>
      </Content>
    </Modal>
  );
};

export default AlarmModal;

const Content = styled.View`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  padding-bottom: 40px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

const HeaderButton = styled.TouchableOpacity``;

const HeaderButtonText = styled.Text<{ color: string }>`
  font-size: 16px;
  color: ${(props: any) => props.color};
  font-weight: bold;
`;

const HeaderTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
`;

const PickerWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const RepeatOptions = styled.View`
  gap: 10px;
`;

const RepeatButton = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${(props: any) =>
    props.selected ? "#a5d6a770" : "#f1f1f1"};
  border-radius: 15px;
  padding: 10px;
  align-items: center;
`;

const RepeatButtonText = styled.Text<{ selected: boolean }>`
  color: ${(props: any) => (props.selected ? "#2e7d32" : "#333")};
  font-size: 14px;
  font-weight: 500;
`;
