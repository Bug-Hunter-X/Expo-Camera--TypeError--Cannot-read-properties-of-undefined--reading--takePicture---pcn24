import React, { useState, useRef, useEffect } from 'react';
import { Camera, useCameraDevices } from 'expo-camera';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef(null);
  const devices = useCameraDevices();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (!isCameraReady) return;
    if (cameraRef.current) {
        try {
          let photo = await cameraRef.current.takePictureAsync();
          console.log('Photo', photo);
        } catch (error) {
          console.error('Error taking picture:', error);
        }
    }
  };

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  if (hasPermission === null) {
    return <View><Text>Requesting permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        device={devices?.[0]}
        onCameraReady={handleCameraReady}
        ref={cameraRef}
      />
      <Button title="Take Picture" onPress={takePicture} />
    </View>
  );
};

export default CameraComponent;