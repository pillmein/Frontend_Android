import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ScreenWrapper, ButtonBack } from "../../../components";
import apiSO from "../../../api/apiSO";

const SupplementAddConfirmView = ({ route, navigation }: any) => {
  const { supplementName, ingredients } = route.params || {};

  const handleAdd = async () => {
    try {
      const response = await apiSO.post("/api/v1/supplements/mylist", {
        supplementName,
        ingredients,
      });

      console.log("복용 중 등록 성공:", response.data.message);
      navigation.navigate("ScanView");
    } catch (error: any) {
      console.error("복용 중 등록 실패:", error.response?.data || error.message);
    }
  };


  const handleSkip = () => {
    console.log(`'${supplementName}' 분석 결과만 저장됨`);
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <ButtonBack />
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{supplementName}</Text>
        <Text style={styles.question}>
          이 영양제를{"\n"}나의 복용중인 영양제 목록에도{"\n"}추가하시겠어요?
        </Text>

        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>네, 추가할게요!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>
            아니요, 분석 결과만 저장할게요.
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default SupplementAddConfirmView;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 28,
    color: "#6a986c",
    fontWeight: "bold",
    marginBottom: 50,
  },
  question: {
    fontSize: 17,
    color: "#222",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  addButton: {
    backgroundColor: "#d9f0dc",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },
  addButtonText: {
    color: "#3a7f5a",
    fontWeight: "bold",
    fontSize: 15,
  },
  skipButton: {
    backgroundColor: "#eeeeee",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  skipButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 15,
  },
});
