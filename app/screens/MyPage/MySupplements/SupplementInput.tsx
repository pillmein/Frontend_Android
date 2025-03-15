import { useState } from "react";
import { Text, View } from "react-native";
import * as S from "../../OnBoarding/Survey/Survey.style";

interface SupplementInputProps {
  supplementName: string;
  setIsComplete: (val: boolean) => void; // 영양제 저장 완료
  setIsDirectInput: (val: boolean) => void; // 직접입력 모드
}

const SupplementInput = ({
  supplementName,
  setIsComplete,
  setIsDirectInput,
}: SupplementInputProps) => {
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
  const [toastVisible, setToastVisible] = useState(false);

  const addIngredient = () => {
    setIngredients((prev) => [...prev, { name: "", amount: "" }]);
  };

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 1000);
  };

  const saveSupplement = () => {
    //유효성 검사 (성분 하나 필수)
    const hasValidIngredient = ingredients.some(
      (item) => item.name.trim() !== ""
    );

    if (!hasValidIngredient) {
      showToast();
      return;
    }

    console.log("저장할 영양제 데이터:", {
      supplementName,
      ingredients,
    });

    setIsComplete(true);
    setIsDirectInput(false);
  };

  return (
    <>
      <S.ConfirmedSupplement>
        <Text>{supplementName}</Text>
      </S.ConfirmedSupplement>

      <S.InputContainer>
        <Text>방금 입력한 영양제 정보를 입력해주세요.</Text>

        {ingredients.map((item, id) => (
          <S.InputRow key={id}>
            <S.InputField
              placeholder="성분명"
              value={item.name}
              onChangeText={(text: string) => {
                const updated = ingredients.map((ing, index) =>
                  index === id ? { ...ing, name: text } : ing
                );
                setIngredients(updated);
              }}
            />

            <S.InputField
              placeholder="함량"
              value={item.amount}
              onChangeText={(text: string) => {
                const updated = ingredients.map((ing, index) =>
                  index === id ? { ...ing, amount: text } : ing
                );
                setIngredients(updated);
              }}
            />
          </S.InputRow>
        ))}

        <S.ButtonContainer>
          <S.AddButton onPress={addIngredient}>
            <Text>성분 추가</Text>
          </S.AddButton>

          <S.SaveButton onPress={saveSupplement}>
            <Text>영양제 저장</Text>
          </S.SaveButton>
        </S.ButtonContainer>
      </S.InputContainer>
      {toastVisible && (
        <View
          style={{
            position: "absolute",
            top: 300,
            alignSelf: "center",
            backgroundColor: "#a5d6a7",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white" }}>
            주요 성분을 하나 이상 입력해주세요!
          </Text>
        </View>
      )}
    </>
  );
};

export default SupplementInput;
