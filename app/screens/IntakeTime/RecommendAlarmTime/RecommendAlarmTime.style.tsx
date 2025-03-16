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

export const SubTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 16px;
`;

export const Description = styled.Text`
  font-size: 14px;
  text-align: center;
  color: #666;
  margin: 0 16px 16px 16px;
  line-height: 22px;
`;

export const ListContainer = styled.View`
  padding: 0 16px;
  margin-bottom: 24px;
`;
