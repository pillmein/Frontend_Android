import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { Text, View, Button, Linking, Alert } from "react-native";
import { useRef, useEffect, useState } from "react";

export const CameraScan = ({ navigation }: any) => {
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();
  const camera = useRef<Camera>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(true);

  // 앱 실행 시 한 번만 카메라 권한 요청
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
      setPhotos([...photos, `file://${photo.path}`]);
    }
  };

  if (!device) return <Text>카메라를 찾을 수 없습니다.</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={camera}
        style={{ flex: 1 }}
        device={device}
        isActive={isCameraActive}
        photo={true}
      />
      <Button title="사진 찍기" onPress={takePhoto} />
      <Button title="카메라 닫기" onPress={() => navigation.goBack()} />
    </View>
  );
};
