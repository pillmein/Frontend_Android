import { useState } from "react";
import { Text, Image } from "react-native";
import * as S from "../../OnBoarding/Survey/Survey.style";
import noResults from "../../../assets/noResults.png";
import SupplementInput from "./SupplementInput";
import { ScreenWrapper } from "../../../components";

const AddMySupplementsView = ({ navigation }: any) => {
  const [inputName, setInputName] = useState(""); // 입력
  const [supplementName, setSupplementName] = useState(""); // 확정
  const [searchResult, setSearchResult] = useState<boolean | null>(null); // DB 검색
  const [isDirectInput, setIsDirectInput] = useState(false); // 직접입력 여부
  const [isComplete, setIsComplete] = useState(false); // 저장 완료 여부

  // 임시 DB 검색함수
  // TODO: 서버 연동 시 변경
  const checkSupplementInDB = (name: string) => {
    const supplementDB = ["밀크씨슬", "임팩타민"];
    return supplementDB.includes(name);
  };

  // 제품명 검색
  const handleSearch = () => {
    if (!inputName.trim()) return;
    setSupplementName(inputName);
    const exists = checkSupplementInDB(inputName);
    setSearchResult(exists);
  };

  const handleConfirmSupplement = () => {
    console.log("저장할 영양제 데이터:", {
      supplementName,
    });
    setIsComplete(true);
  };

  // 저장 확인 후 이전 화면으로
  const handleConfirmComplete = () => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <S.SurveyContainer>
        {isComplete ? (
          <S.CompleteContainer>
            <S.ConfirmText>나의 영양제 목록에 저장되었습니다.</S.ConfirmText>
            <S.ConfirmButton onPress={handleConfirmComplete}>
              <Text>확인</Text>
            </S.ConfirmButton>
          </S.CompleteContainer>
        ) : (
          <>
            {isDirectInput ? (
              <SupplementInput
                supplementName={inputName}
                setIsComplete={setIsComplete}
                setIsDirectInput={setIsDirectInput}
              />
            ) : (
              <>
                <S.SearchInputContainer>
                  <S.SearchInput
                    placeholder="제품명을 입력해주세요!"
                    value={inputName}
                    onChangeText={setInputName}
                  />
                  <S.ConfirmButton onPress={handleSearch}>
                    <S.ConfirmButtonText>확인</S.ConfirmButtonText>
                  </S.ConfirmButton>
                </S.SearchInputContainer>

                {searchResult === true && (
                  <>
                    <S.ProductContainer>
                      <Text>아래 영양제가 맞나요?</Text>
                      <S.ProductCard>
                        <S.ProductImage
                          source={{
                            uri: "https://media.istockphoto.com/id/1150593135/ko/%EB%B2%A1%ED%84%B0/비타민-이미지.jpg",
                          }}
                        />
                        <S.ProductName>{supplementName}</S.ProductName>
                      </S.ProductCard>
                    </S.ProductContainer>

                    <S.YesOrNoContainer>
                      <S.YesOrInputButton onPress={handleConfirmSupplement}>
                        <S.YesOrInputText>예</S.YesOrInputText>
                      </S.YesOrInputButton>

                      <S.YesOrInputButton
                        onPress={() => setIsDirectInput(true)}
                      >
                        <S.YesOrInputText>
                          아니요, 직접 입력할게요
                        </S.YesOrInputText>
                      </S.YesOrInputButton>
                    </S.YesOrNoContainer>
                  </>
                )}

                {searchResult === false && (
                  <S.ResultsContainer>
                    <Image
                      source={noResults}
                      style={{ height: 100, width: 100 }}
                    />
                    <S.NoResultsText>
                      검색 결과가 없어요!{`\n`}오타가 없는지 확인해주세요.
                    </S.NoResultsText>

                    <S.ResultsButton onPress={() => setIsDirectInput(true)}>
                      <Text>직접 정보 입력할게요.</Text>
                    </S.ResultsButton>
                  </S.ResultsContainer>
                )}
              </>
            )}
          </>
        )}
      </S.SurveyContainer>
    </ScreenWrapper>
  );
};

export default AddMySupplementsView;
