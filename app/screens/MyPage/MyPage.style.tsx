import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: white;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

export const LogoutButton = styled.TouchableOpacity`
  padding: 8px 15px;
  border: 1px solid #a5d6a7;
  border-radius: 20px;
`;

export const LogoutText = styled.Text`
  font-size: 14px;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
`;

export const MenuText = styled.Text`
  font-size: 18px;
  margin-left: 12px;
`;
