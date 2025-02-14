import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons"; // 아이콘 사용 (expo-vector-icons)

const ButtonBack = () => {
  const navigation = useNavigation();

  return (
    <BackButton onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={25} />
    </BackButton>
  );
};

const BackButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

export default ButtonBack;
