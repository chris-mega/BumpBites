import { Image, Spinner, YStack } from "tamagui";

export default function LoadingScreen() {
  return (
    <YStack width="100%" height="100%" alignItems="center" justifyContent="center">
      <Image
        alignSelf="center"
        source={require("../assets/images/Avocado.jpg")}
        style={{ width: 200, height: 200 }}
      />
      <Spinner size="large" color="orange" />
    </YStack>
  )
}
