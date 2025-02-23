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
  min-height: 650px;
  flex-direction: column;
`;
export const Category = styled.Text`
  font-size: 20px;
  color: #a5d6a7;
  font-weight: bold;
`;

export const Question = styled.Text`
  font-size: 18.5px;
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
    props.selected ? "#A5D6A750" : "white"};
  padding: 15px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid
    ${(props: { selected: any }) => (props.selected ? "#A5D6A7" : "#ddd")};
  margin-bottom: 10px;
  shadow-color: "#ddd";
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const OptionText = styled.Text`
  font-size: 16px;
`;

export const CheckMark = styled.Text`
  font-size: 10px;
`;

export const BottomNav = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 180px;
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

export const YesOrNoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;
export const YesOrNoButton = styled.TouchableOpacity`
  width: 70px;
  height: 50px;
  background-color: ${(props: { isSelected: any }) =>
    props.isSelected ? "#a5d6a790" : "white"};
  border: 1px #d9d9d9;
  padding: 10px 10px;
  margin: 0 10px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

export const YesOrNoText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const NextButton = styled.TouchableOpacity`
  background-color: ${(props: { disabled: any }) =>
    props.disabled ? "#D9D9D9" : "#a5d6a790"};
  padding: 15px;
  border-radius: 10px;
  margin-vertical: 10px;
`;

export const NextButtonText = styled.Text`
  text-align: center;
  font-size: 16px;
`;
export const SearchInputContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;
export const SearchInput = styled.TextInput`
  width: 80%;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background-color: #a5d6a760;
  padding: 10px;
  border-radius: 8px;
  justify-content: center;
`;

export const ConfirmButtonText = styled.Text`
  font-size: 13px;
`;

export const ProductContainer = styled.View`
  align-items: center;
`;
export const ProductCard = styled.View`
  align-items: center;
  width: 200px;
  height: 250px;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
`;
export const ProductImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-bottom: 80px;
`;

export const ProductName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const YesOrInputButton = styled.TouchableOpacity`
  background-color: ${(props: { isSelected: any }) =>
    props.isSelected ? "#a5d6a790" : "white"};
  border: 1px #d9d9d9;
  padding: 10px 10px;
  margin: 0 10px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

export const YesOrInputText = styled.Text`
  font-size: 10px;
  font-weight: bold;
`;

export const ResultsContainer = styled.View`
  align-items: center;
`;
export const NoResultsText = styled.Text`
  text-align: center;
`;

export const EmptyStateContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;

export const EmptyStateText = styled.Text`
  font-size: 14px;
  color: gray;
`;
export const ConfirmedSupplement = styled.View`
  border: 1px #a5d6a7;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
`;
export const InputContainer = styled.View`
  align-items: center;
`;
export const InputRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  gap: 10px;
`;

export const InputField = styled.TextInput`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  width: 48%;
  margin-top: 20px;
  background-color: #fff;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 15px;
`;

export const AddButton = styled.TouchableOpacity`
  padding: 8px 12px;
  border: 1px #a5d6a7;
  border-radius: 20px;
  margin-right: 8px;
`;

export const SaveButton = styled.TouchableOpacity`
  padding: 8px 12px;
  border: 1px #a5d6a7;
  background-color: #a5d6a740;
  border-radius: 20px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  color: #444;
`;

export const ResultsButton = styled.TouchableOpacity`
  background-color: #a5d6a730;
  padding: 3px;
  border-radius: 5px;
  align-items: center;
  border: 1px #d9d9d9;
  margin-top: 10px;
`;

export const AddContainer = styled.View`
  flex: 1;
  align-items: flex-end;
`;
