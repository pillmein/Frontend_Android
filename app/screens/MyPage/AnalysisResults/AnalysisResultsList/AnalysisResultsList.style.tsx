import styled from "styled-components/native";

export const SupplementsContainer = styled.View`
  margin-top: 20px;
`;

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
  width: 100%;
  flex-direction: row;
  padding: 5px;
  border-radius: 15px;
  margin-bottom: 15px;
  border: 1px #ddd;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  resize-mode: contain;
`;

export const InfoContainer = styled.View`
  flex: 1;
  gap: 2px;
`;
export const NameContainer = styled.View`
  padding: 10px;
  justify-content: center;
`;
export const SupplementName = styled.Text`
  font-size: 15px;
`;

export const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;
