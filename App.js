import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image, Button, Platform } from 'react-native';
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [image, setImage] = useState();
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "android") {
        console.log("Platform is not Android");
        return;
      }
      const pickerResults = await ImagePicker.getPendingResultAsync();
      if (pickerResults === null) {
        console.log("getPendingResultAsync returned null");
        return;
      }
      if (pickerResults.length === 0) {
        console.log("getPendingResultAsync returned an empty array");
        return;
      }

      const pickerResult = pickerResults[0];

      if ('exception' in pickerResult) {
        console.log("Error occurred with picker:", pickerResult);
        return;
      }
      if (pickerResult.canceled) {
        console.log("Picker got canceled");
        return;
      }
      console.log("Got image from pending results:", pickerResult.assets[0]);
      setImage(pickerResult.assets[0]);
    })();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      {image && (
        <Image
          style={styles.image}
          source={image}
        />
      )}
      <Button
        title="Launch Camera"
        onPress={async () => {
          const result = await ImagePicker.launchCameraAsync();
          if (result.canceled) {
            console.log("launchCameraAsync canceled");
            return;
          }
          console.log("Got image after calling launchCameraAsync:", result.assets[0]);
          setImage(result.assets[0]);
        }}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  image: {
    resizeMode: "contain",
    width: 300,
    height: 300
  },
});
