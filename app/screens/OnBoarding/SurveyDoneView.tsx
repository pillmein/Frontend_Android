import { Button } from "react-native";
import Header from "../../components/Header";
import styled from "styled-components/native";

const SurveyResult = function ({ navigation }: any) {
  return (
    <Container>
      <Header />
      <Button
        title="Pill Me In 시작"
        onPress={() => navigation.navigate("MainApp")}
      />
    </Container>
  );
};

export default SurveyResult;

const Container = styled.View``;
