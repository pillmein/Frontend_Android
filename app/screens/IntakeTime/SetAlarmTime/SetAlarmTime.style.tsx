import styled from "styled-components/native";

export const Header = styled.View`
  margin-top: 5px;
  margin-bottom: 10px;
  flex-direction: row;
  position: relative;
`;
export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
`;

export const EmptyAlarmContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 40px;
`;

export const EmptyAlarmText = styled.Text`
  color: #a5d6a7;
  font-size: 16px;
  margin-top: 30px;
  text-align: center;
  line-height: 24px;
`;

export const Button = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  left: 20px;
  right: 20px;
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 10px;
  margin-vertical: 10px;
`;

export const ButtonText = styled.Text`
  text-align: center;
  font-size: 16px;
`;

export const AlarmListContainer = styled.View``;

export const BottomContainer = styled.View`
  position: absolute;
  bottom: 90px;
  background-color: "white";
`;

export const AddAlarmButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  left: 20px;
  right: 20px;
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 10px;
  margin-vertical: 10px;
  align-items: center;
`;

export const AddAlarmButtonText = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: 500;
`;
