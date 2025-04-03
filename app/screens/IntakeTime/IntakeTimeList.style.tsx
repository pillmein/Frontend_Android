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

export const SupplementCard = styled.View`
  flex-direction: row;
  border: 1px #ddd;
  border-radius: 10px;
  padding: 15px;
  margin: 10px 15px;
  align-items: center;
  justify-content: space-between;
`;

export const SupplementInfo = styled.View`
  flex: 1;
  gap: 10px;
`;

export const SupplementName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const SupplementDetail = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IngredientBadge = styled.Text`
  background-color: #a5d6a760;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 10px;
`;

export const alarmCount = styled.Text`
  background-color: #a5d6a760;
  padding: 7px 12px;
  border: #a5d6a7;
  border-radius: 8px;
  font-size: 10px;
`;

export const MoveToSetting = styled.TouchableOpacity`
  padding: 10px;
`;
