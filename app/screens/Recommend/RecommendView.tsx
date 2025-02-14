import Supplements from "../../components/Supplements/Supplements";
import Header from "../../components/Header";
import { TouchableOpacity } from "react-native";

import styled from "styled-components/native";

//임시 데이터
const supplementData = [
  {
    image:
      "https://mblogthumb-phinf.pstatic.net/MjAxOTEwMThfMjYw/MDAxNTcxMzgxNjI0NDYx.O50IFDXsRFr5xxzQllBdkJyDRYLYVn0B3vcXT3QT89Eg.Ge8tcmWVjRte8AOo1t9f5Lo0zMgIEKpfiVFHXTV0E9kg.PNG.pharmcadia/SE-f4b5e85f-8d97-4baa-a98f-155b006c6415.png?type=w800",
    name: "비맥스 메타",
    ingredients: "비타민B1",
    amount: "95mg",
    effects: "피로 회복, 신경 건강 지원, 에너지 대사 촉진",
    precautions: "공복 섭취 피하기, 야연 과다 복용 주의",
  },
  {
    image: "",
    name: "영양제 A",
    ingredients: "비타민C, 아연",
    amount: "500mg, 10mg",
    effects: "면역력 강화, 항산화 작용",
    precautions: "과다 섭취 시 위장 장애 가능",
  },
  {
    image: "",
    name: "영양제 B",
    ingredients: "오메가3, DHA",
    amount: "1000mg",
    effects: "혈액 순환 개선, 두뇌 건강 지원",
    precautions: "혈액 응고 억제 효과로 수술 전 섭취 주의",
  },
];

const RecommendView = ({ navigation }: any) => {
  return (
    <Container>
      <Header />
      <Text> OO님에게 {"\n"} 아래 영양제를 추천드려요 !</Text>
      <SupplementsContainer>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SupplementInfoView", { supplementData })
          }
        >
          {supplementData.map(
            (
              { image, name, ingredients, amount, effects, precautions },
              id
            ) => (
              <Supplements
                key={id}
                image={image}
                name={name}
                ingredients={ingredients}
                amount={amount}
                effects={effects}
                precautions={precautions}
              />
            )
          )}
        </TouchableOpacity>
      </SupplementsContainer>
    </Container>
  );
};

export default RecommendView;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;
const SupplementsContainer = styled.View`
  margin-top: 20px;
`;

const Text = styled.Text`
  color: gray;
  font-size: 20px;
`;
