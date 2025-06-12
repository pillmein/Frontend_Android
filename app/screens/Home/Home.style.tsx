import styled from "styled-components/native";

export const CalendarContainer = styled.View`
  margin-top: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  shadow-color: "#ddd";
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
`;
export const MonthText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 5px;
  margin-bottom: 5px;
`;

export const DayContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: 3px;
  border-radius: 10px;
  gap: 10px;
`;

export const DayText = styled.Text`
  color: gray;
  font-size: 12px;
`;
export const DateContainer = styled.View`
  position: relative;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const BackgroundImage = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.6;
`;

export const DateText = styled.Text<{ isToday: boolean }>`
  font-size: 16px;
  font-weight: ${(props: any) => (props.isToday ? "bold" : "normal")};
  color: ${(props: any) => (props.isToday ? "#a5d6a7" : "#333")};
`;

export const ProgressContainer = styled.View`
  border: 1px solid #d9d9d9;
  border-radius: 15px;
  padding: 15px;
  gap: 5px;
`;

export const ProgressTitle = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

export const ProgressBarContainer = styled.View`
  height: 8px;
  border-radius: 5px;
  background-color: #d9d9d9;
  flex-direction: row;
  margin-bottom: 5px;
`;

export const ProgressBarFilled = styled.View<{ width: number }>`
  height: 100%;
  width: ${(props: any) => props.width}%;
  background-color: #a5d6a7;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export const ProgressBarRemaining = styled.View<{ width: number }>`
  height: 100%;
  width: ${(props: any) => props.width}%;
  background-color: #e0e0e0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const MessageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #a5d6a730;
  padding: 8px 12px;
  border-radius: 15px;
  align-self: center;
  margin-top: 5px;
`;

export const MessageText = styled.Text`
  font-size: 14px;
  color: #333;
  margin-right: 5px;
`;

export const SupplementContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 10px;
  background-color: #a5d6a730;
  border-radius: 20px;
  padding: 10px;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const SupplementItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 5px;
`;

export const SupplementText = styled.Text`
  margin-left: 10px;
  font-size: 16px;
`;

export const CategoryTag = styled.View`
  margin-left: auto;
  background-color: #a5d6a775;
  padding: 3px 8px;
  border-radius: 15px;
`;

export const CategoryText = styled.Text`
  font-size: 14px;
  color: #333;
`;

export const EmptySupplementContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export const EmptySupplementText = styled.Text`
  color: #a5d6a7;
  font-size: 16px;
  margin-top: 30px;
  text-align: center;
  line-height: 24px;
`;

export const NoRecordText = styled.Text`
  font-size: 15px;
  color: #666;
  text-align: center;
`;