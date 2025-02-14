import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: white;
`;
export const SurveyContainer = styled.View`
  padding: 30px;
  gap: 20px;
  display: flex;
  min-height: 750px;
  flex-direction: column;
`;
export const Category = styled.Text`
  font-size: 20px;
  color: #a5d6a7;
  font-weight: bold;
`;

export const Question = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: gray;
  margin-bottom: 20px;
`;

export const OptionButton = styled.TouchableOpacity`
  background-color: ${(props: { selected: any }) =>
    props.selected ? "#A5D6A7" : "white"};
  padding: 15px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid
    ${(props: { selected: any }) => (props.selected ? "#A5D6A7" : "#ddd")};
  margin-bottom: 10px;
`;

export const OptionText = styled.Text`
  font-size: 16px;
`;

export const CheckMark = styled.Text`
  font-size: 10px;
`;
export const SkipFrame = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;
export const SkipInfoText = styled.Text`
  font-size: 14px;
  color: gray;
`;
export const SkipButton = styled.TouchableOpacity`
  align-self: flex-end;
  padding: 5px 10px;
  background-color: #ddd;
  border-radius: 10px;
`;

export const SkipText = styled.Text`
  font-size: 14px;
  color: gray;
`;

export const BottomNav = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 30px;
`;
export const NavPrevButton = styled.TouchableOpacity`
  background-color: #ddd;
  padding: 10px 20px;
  border-radius: 5px;
`;
export const NavButton = styled.TouchableOpacity`
  background-color: #a5d6a7;
  padding: 10px 20px;
  border-radius: 5px;
`;

export const NavButtonText = styled.Text`
  color: ${(props: { disabled: any }) => (props.disabled ? "#aaa" : "white")};
  font-size: 16px;
`;

export const PageIndicator = styled.Text`
  font-size: 16px;
  color: gray;
`;
