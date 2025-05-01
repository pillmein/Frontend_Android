import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const TopContainer = styled.View`
  width: 100%;
  height: 15%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  padding: 20px 50px;
  background: black;
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 80%;
`;

export const ImagePreview = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

export const DeleteButton = styled.TouchableOpacity`
  padding: 8px 10px;
`;

export const AnalyzeButton = styled.Text`
  background-color: white;
  border-radius: 10px;
  font-size: 18px;
  padding: 8px 10px;
`;

export const Thumbnail = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

export const BottomContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 13%;
  bottom: 0;
  padding: 30px;
  background-color: black;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CaptureAgainButton = styled.Text`
  font-size: 18px;
  color: white;
`;

export const AddButton = styled.Text`
  font-size: 18px;
  color: white;
`;

export const PhotoCount = styled.Text`
  color: white;
  font-size: 18px;
`;

export const LoadingOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const LoadingText = styled.Text`
  margin-top: 12px;
  font-size: 15px;
  color: #a5d6a7;
  text-align: center;
  line-height: 22px;
`;
