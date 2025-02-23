import { useState } from "react";
import { Text, Image, View } from "react-native";
import * as S from "./Survey.style";
import noResults from "../../../assets/noResults.png";
import SupplementInput from "./SupplementInput";

const SupplementSearch = ({
  setIsConfirmed,
  confirmedSupplements,
  setConfirmedSupplements,
  isSearching,
  setIsSearching,
}: any) => {
  const [supplementName, setSupplementName] = useState<string>("");
  const [searchResult, setSearchResult] = useState<boolean | null>(null);
  const [supplementInput, setSupplementInput] = useState<boolean>(false);

  //임시 db
  const checkSupplementInDB = (name: string) => {
    const supplementDB = ["밀크씨슬", "임팩타민"];
    return supplementDB.includes(name);
  };

  const handleSearch = () => {
    if (!supplementName.trim()) return;
    const existsInDB = checkSupplementInDB(supplementName);
    setSearchResult(existsInDB);
  };

  const handleConfirmSupplement = () => {
    setConfirmedSupplements((prev: string[]) => [...prev, supplementName]);
    setIsConfirmed(true);
    setSupplementName("");
    setSearchResult(null);
    setIsSearching(false);
  };

  return (
    <>
      {confirmedSupplements.length > 0 && (
        <View>
          {confirmedSupplements.map((supplement: string, id: number) => (
            <View key={id}>
              <S.ConfirmedSupplement>
                <Text>{supplement}</Text>
              </S.ConfirmedSupplement>
            </View>
          ))}
        </View>
      )}

      {confirmedSupplements.length > 0 && !isSearching && (
        <S.ResultsButton
          onPress={() => {
            setIsSearching(true);
          }}
        >
          <Text>영양제 추가하기</Text>
        </S.ResultsButton>
      )}

      {supplementInput ? (
        <SupplementInput
          supplementName={supplementName}
          setIsConfirmed={setIsConfirmed}
          setIsSearching={setIsSearching}
          setSupplementName={setSupplementName}
          setSupplementInput={setSupplementInput}
          setConfirmedSupplements={setConfirmedSupplements}
        />
      ) : (
        isSearching && (
          <>
            <S.SearchInputContainer>
              <S.SearchInput
                placeholder="제품명을 입력해주세요!"
                value={supplementName}
                onChangeText={setSupplementName}
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
                        uri: "https://media.istockphoto.com/id/1150593135/ko/%EB%B2%A1%ED%84%B0/%EA%B1%B4%EA%B0%95-%EB%B3%B4%EC%A1%B0-%EC%8B%9D%ED%92%88-%EB%B9%84%ED%83%80%EB%AF%BC-%ED%94%8C%EB%9E%AB-%EC%95%84%EC%9D%B4%EC%BD%98-%EC%99%84%EB%B2%BD-%ED%95%9C-%ED%94%BD%EC%85%80-%EB%AA%A8%EB%B0%94%EC%9D%BC-%EB%B0%8F-%EC%9B%B9%EC%97%90-%EC%A0%81%ED%95%A9-%ED%95%A9%EB%8B%88%EB%8B%A4.jpg?s=612x612&w=0&k=20&c=bczYHHrZUc997zTMS456mwOCOVZYF_k9lRfPIDVOYnw=",
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
                    onPress={() => {
                      setSearchResult(null);
                      setSupplementInput(true);
                    }}
                  >
                    <S.YesOrInputText>
                      아니요, 직접 정보 입력할게요.
                    </S.YesOrInputText>
                  </S.YesOrInputButton>
                </S.YesOrNoContainer>
              </>
            )}

            {searchResult === false && (
              <S.ResultsContainer>
                <Image
                  source={noResults}
                  style={{
                    height: 100,
                    width: 100,
                  }}
                />
                <S.NoResultsText>
                  검색 결과가 없어요!{`\n`}오타가 없는지 확인해주세요.
                </S.NoResultsText>
                <S.ResultsButton
                  onPress={() => {
                    setSearchResult(null);
                    setSupplementInput(true);
                  }}
                >
                  <Text>직접 정보 입력할게요.</Text>
                </S.ResultsButton>
              </S.ResultsContainer>
            )}
          </>
        )
      )}
    </>
  );
};

export default SupplementSearch;
