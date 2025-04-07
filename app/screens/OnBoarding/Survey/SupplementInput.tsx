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

  const saveSupplement = () => {
    const ingredientString = ingredients
      .filter((item) => item.name.trim() !== "")
      .map((item) =>
        item.amount.trim() !== ""
          ? `${item.name.trim()} ${item.amount.trim()}`
          : item.name.trim()
      )
      .join(", ");

    const supplementData = {
      supplementName,
      ingredients: ingredientString,
    };

    console.log("복용 중인 영양제로 저장:", supplementData);

    setConfirmedSupplements((prev: any[]) => {
      const updatedSupplements = [...prev, supplementData];

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
