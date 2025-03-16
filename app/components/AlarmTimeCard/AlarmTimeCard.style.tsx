import styled from "styled-components/native";

export const CardContainer = styled.View`
  width: 100%;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  margin-bottom: 16px;
  background-color: #fff;

  flex-direction: column;
  justify-content: center;
`;

export const RepeatTypeText = styled.Text`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
`;

export const TimeRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TimeTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AmPmText = styled.Text`
  font-size: 16px;
  color: #000;
  margin-right: 8px;
`;

export const HourText = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: #333;
  background-color: #a5d6a730;
  padding: 4px 8px;
  border-radius: 8px;
`;

export const ColonText = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: #333;
  margin: 0 4px;
`;

export const MinuteText = styled.Text`
  font-size: 48px;
  font-weight: bold;
  color: #333;
  background-color: #f5f5f5;
  padding: 4px 8px;
  border-radius: 8px;
`;
