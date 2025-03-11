import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  position: relative;
`;
export const Header = styled.View`
  position: absolute;
  width: 100%;
  height: 15%;
  background-color: black;
`;

export const CancelButton = styled.TouchableOpacity`
  left: 40px;
  width: 60px;
  top: 65px;
  height: 40px;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const CancelText = styled.Text`
  color: white;
  font-size: 20px;
`;

export const BottomContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 13%;
  bottom: 0;
  background-color: black;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CaptureButton = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

export const ThumbnailContainer = styled.TouchableOpacity`
  position: absolute;
  left: 10%;
  width: 50px;
  height: 50px;
  overflow: hidden;
`;

export const Thumbnail = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;
