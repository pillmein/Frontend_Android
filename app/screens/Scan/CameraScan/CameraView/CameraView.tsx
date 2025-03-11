import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { Text, View, Button, Linking, Alert } from "react-native";
import { useRef, useEffect, useState } from "react";
import * as S from "./Camera.style";

export const CameraView = ({ route, navigation }: any) => {
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();
  const camera = useRef<Camera>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>(
    route.params?.capturedPhotos || []
  );
  const [isCameraActive, setIsCameraActive] = useState(true);

  // 앱 실행 시 한 번만 카메라 권한 요청
  useEffect(() => {
    if (route.params?.capturedPhotos) {
      setCapturedPhotos(route.params.capturedPhotos);
    }
  }, [route.params?.capturedPhotos]); // 👈 route 변경 감지하여 업데이트

  useEffect(() => {
    (async () => {
      if (!hasPermission) {
        const permissionGranted = await requestPermission();
        if (!permissionGranted) {
          Alert.alert(
            "카메라 권한 필요",
            "이 앱에서 카메라를 사용하려면 설정에서 권한을 허용해야 합니다.",
            [
              { text: "설정 열기", onPress: () => Linking.openSettings() },
              { text: "취소", style: "cancel" },
            ]
          );
        }
      }
    })();
  }, [hasPermission]);

  const takePhoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      setCapturedPhotos([...capturedPhotos, `file://${photo.path}`]);
      const newPhoto = `file://${photo.path}`;

      const updatedPhotos = [...capturedPhotos, newPhoto];
      setCapturedPhotos(updatedPhotos);
      navigation.navigate("PreviewView", { capturedPhotos: updatedPhotos });
    }
  };

  if (!device) return <Text>카메라를 찾을 수 없습니다.</Text>;

  return (
    <S.Container>
      <View style={{ flex: 1 }}>
        <Camera
          ref={camera}
          style={{ flex: 1 }}
          device={device}
          isActive={isCameraActive}
          photo={true}
        />
      </View>
      <S.Header>
        <S.CancelButton onPress={() => navigation.navigate("ScanView")}>
          <S.CancelText>취소</S.CancelText>
        </S.CancelButton>
      </S.Header>

      <S.BottomContainer>
        {capturedPhotos.length > 0 && (
          <S.ThumbnailContainer
            onPress={() => navigation.navigate("Preview", { capturedPhotos })}
          >
            <S.Thumbnail
              source={{ uri: capturedPhotos[capturedPhotos.length - 1] }}
            />
          </S.ThumbnailContainer>
        )}
        <S.CaptureButton onPress={takePhoto} />
      </S.BottomContainer>
    </S.Container>
  );
};
