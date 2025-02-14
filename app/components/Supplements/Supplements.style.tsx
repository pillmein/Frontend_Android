import styled from "styled-components/native";

export const Container = styled.View`
  padding: 2px 10px;
`;

export const SupplementCard = styled.View`
  background-color: white;
  border-radius: 10px;
  shadow-color: rgba(0, 0, 0, 0.3);
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 3;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  margin-bottom: 10px;
  flex-direction: column;
`;
export const Content = styled.View`
  flex-direction: row;
  justifycontent: "flex-start";
`;
export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  textalign: left;
`;
export const Image = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 12px;
`;

export const Info = styled.View`
  flex: 1;
`;

export const Tag = styled.Text`
  font-size: 14px;
  color: #a5d6a7;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Description = styled.Text`
  font-size: 12px;
  color: #666;
  margin-bottom: 3px;
`;
