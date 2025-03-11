import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import * as S from "./Preview.style";
import { Ionicons } from "@expo/vector-icons";
import SwiperFlatList from "react-native-swiper-flatlist";
//import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SwiperFlatListWithGestureHandler } from "react-native-swiper-flatlist/WithGestureHandler";

const PreviewView = ({ route, navigation }: any) => {
  const [photos, setPhotos] = useState(route.params?.capturedPhotos || []);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (photos.length > 0 && currentIndex !== photos.length - 1) {
      setCurrentIndex(photos.length - 1);
    }
  }, [photos.length]);

  useEffect(() => {
    console.log("현재 선택된 인덱스:", currentIndex);
  }, [currentIndex]);

  // 사진 삭제 후, 이전 사진으로 이동
  const deletePhoto = () => {
    if (photos.length === 0) return;
    const updatedPhotos = [...photos];
    updatedPhotos.splice(currentIndex, 1);
    setPhotos(updatedPhotos);

    if (updatedPhotos.length === 0) {
      navigation.replace("CameraView");
    } else {
      setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1)); // 이전 사진으로 이동
    }
  };

  const handleRetake = () => {
    const deletedPhotos = [...photos];
    deletedPhotos.splice(currentIndex, 1); // 현재 선택된 사진 제거 후 업데이트
    setPhotos(deletedPhotos); // 상태 업데이트
    setCurrentIndex(Math.max(0, currentIndex - 1)); // 이전 사진으로 이동

    // CameraView로 이동하면서 새로운 사진 배열을 넘김
    navigation.replace("CameraView", { capturedPhotos: deletedPhotos });
  };

  useEffect(() => {
    if (photos.length > 0 && currentIndex >= photos.length) {
      setCurrentIndex(photos.length - 1);
    }
  }, [photos]);

  const handleAddPhoto = () => {
    // 기존 사진을 유지한 채 CameraView로 이동
    navigation.replace("CameraView", { capturedPhotos: photos });
  };

  return (
    <S.Container>
      <S.TopContainer>
        <S.DeleteButton onPress={deletePhoto}>
          <Ionicons name="trash-outline" size={20} color="white" />
        </S.DeleteButton>
        <TouchableOpacity
          onPress={() => navigation.navigate("AnalysisView", { photos })}
        >
          <S.AnalyzeButton>분석</S.AnalyzeButton>
        </TouchableOpacity>
      </S.TopContainer>

      <S.ImageContainer>
        <S.ImagePreview
          source={{ uri: photos[currentIndex] }}
          resizeMode="cover"
        />
      </S.ImageContainer>

      {/* <FlatList
        data={photos}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <S.Thumbnail
            source={{ uri: item }}
            onPress={() => setCurrentIndex(index)}
          />
        )}
      /> */}
      {/* ✅ SwiperFlatList 적용 */}
      <S.ImageContainer>
        <SwiperFlatListWithGestureHandler
          data={photos}
          index={currentIndex}
          onChangeIndex={({ index }) => {
            console.log("SwiperFlatList에서 변경된 index:", index);
            setCurrentIndex(index);
          }} // 스와이프할 때 인덱스 변경
          renderItem={({ item }) => (
            <S.ImagePreview source={{ uri: item }} resizeMode="cover" />
          )}
        />
      </S.ImageContainer>
      <S.BottomContainer>
        <TouchableOpacity onPress={handleRetake}>
          <S.CaptureAgainButton>다시 찍기</S.CaptureAgainButton>
        </TouchableOpacity>
        <S.PhotoCount>
          {currentIndex + 1} / {photos.length}
        </S.PhotoCount>
        <TouchableOpacity onPress={handleAddPhoto}>
          <S.AddButton>사진 추가</S.AddButton>
        </TouchableOpacity>
      </S.BottomContainer>
    </S.Container>
  );
};

export default PreviewView;
