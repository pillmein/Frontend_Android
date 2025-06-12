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
  min-height: 180px;
  flex-direction: row;
  padding: 3px;
  border-radius: 15px;
  margin-bottom: 15px;
  border: 1px #ddd;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
`;

export const ImageContainer = styled.View`
  width: 80px;
  height: 80px;
  margin-left: 5px;
  margin-right: 10px;
  align-self: center;
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
  margin-top: 20px;
  margin-bottom: 5px;
`;
export const SupplementName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

export const Badge = styled.Text`
  background-color: #a5d6a730;
  padding: 10px;
  border-radius: 15px;
  font-size: 14px;
  margin-right: 10px;
`;

export const Amount = styled.Text`
  font-size: 16px;
`;

export const Description = styled.Text`
  font-size: 14px;
  margin-top: 5px;
`;

export const BoldText = styled.Text`
  font-weight: bold;
`;

export const EmptyMessageContainer = styled.View`
  align-items: center;
  padding: 40px 20px;
`;

export const EmptyMessageText = styled.Text`
  font-size: 16px;
  color: #888;
  text-align: center;
  line-height: 24px;
`;