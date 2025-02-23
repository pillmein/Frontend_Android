import { useState } from "react";
import { Text } from "react-native";
import * as S from "./Survey.style";

const SupplementInput = ({
  supplementName,
  setIsConfirmed,
  setIsSearching,
  setSupplementName,
  setSupplementInput,
  setConfirmedSupplements,
}: any) => {
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);

  const addIngredient = () => {
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      { name: "", amount: "" },
    ]);
  };

  // 입력한 정보 서버로 전송
  // TODO: API 연동
  const saveSupplement = () => {
    console.log("서버로 전송:", { supplementName, ingredients });

    setConfirmedSupplements((prev: string[]) => {
      const updatedSupplements = [...prev, supplementName];

      setIsConfirmed(true);
      setIsSearching(false);
      setSupplementName("");

      return updatedSupplements;
    });

    setSupplementInput(false);
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
                setIngredients((prev) =>
                  prev.map((ing, i) =>
                    i === id ? { ...ing, name: text } : ing
                  )
                );
              }}
            />
            <S.InputField
              placeholder="함량"
              value={item.amount}
              onChangeText={(text: string) => {
                setIngredients((prev) =>
                  prev.map((ing, i) =>
                    i === id ? { ...ing, amount: text } : ing
                  )
                );
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
    </>
  );
};

export default SupplementInput;
