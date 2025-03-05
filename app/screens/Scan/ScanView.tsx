import { ScreenWrapper } from "../../components";
import { Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import AntDesign from "@expo/vector-icons/AntDesign";

const ScanView = ({ navigation }: any) => {
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri);
      navigation.navigate("AnalysisView", { images: selectedImages });
    }
  };

  return (
    <ScreenWrapper>
      <ScanContainer>
        <LabelContainer>
          <ScanTitle>
            영양제 라벨<Text style={{ color: "#a5d6a7" }}> 뒷면</Text>을
            찍어주세요!
          </ScanTitle>
          <ScanLabel>
            어렵기만 했던 영양 성분,{`\n`}쉽고 간편하게 설명해 드려요.
          </ScanLabel>
        </LabelContainer>
        <SelectContainer onPress={() => navigation.navigate("CameraView")}>
          <AntDesign name="camerao" size={70} color="#a5d6a7" />
          <Text style={{ color: "#a5d6a7", fontWeight: "bold" }}>카메라</Text>
        </SelectContainer>
        <SelectContainer onPress={pickImages}>
          <AntDesign name="picture" size={70} color="#a5d6a7" />
          <Text style={{ color: "#a5d6a7", fontWeight: "bold" }}>갤러리</Text>
        </SelectContainer>
      </ScanContainer>
    </ScreenWrapper>
  );
};
export default ScanView;

const ScanContainer = styled.View`
  flex: 1;
  align-items: center;
  gap: 10px;
  margin-top: 50px;
`;
const LabelContainer = styled.View`
  gap: 20px;
`;
const ScanTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const ScanLabel = styled.Text`
  margin-top: 5px;
  margin-bottom: 10px;
  line-height: 20px;
`;
const SelectContainer = styled.TouchableOpacity`
  margin-top: 30px;
  background-color: #a5d6a730;
  width: 250px;
  height: 150px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;
