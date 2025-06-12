import { ScreenWrapper } from "../../components";
import { Alert, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL_SO } from "@env";

const ScanView = ({ navigation }: any) => {
  const pickImages = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsMultipleSelection: true,
    quality: 1,
  });

  if (!result.canceled) {
    try {
      const selectedImages = result.assets.map((asset) => asset.uri);
      const formData = new FormData();

      selectedImages.forEach((uri, index) => {
        formData.append("images", {
          uri,
          type: "image/jpeg",
          name: `gallery_${index}.jpg`,
        } as any);
      });

      const token = await AsyncStorage.getItem("accessToken");

      const response = await axios.post(`${API_BASE_URL_SO}/ocr/analyze`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("갤러리 분석 결과:", response.data);

      // 분석 결과 페이지로 이동
      navigation.navigate("AnalysisView", { result: response.data });
    } catch (error: any) {
      console.error("갤러리 분석 실패:", error.response?.data || error.message);
      Alert.alert("분석 실패", "이미지 분석 중 오류가 발생했어요.");
    }
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
