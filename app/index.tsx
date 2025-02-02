import React from 'react';
import { YStack, H1, Paragraph, View, Card, H3, XStack, Button, Image, CardProps, Text } from 'tamagui';
import StartScreen from './start';

export default function HomeScreen() {
  const [signedIn, setSignedIn] = React.useState(true);
  return (
    <View>
      {!signedIn ? <StartScreen /> :
        <YStack padding={20}>
          <XStack gap="$3">
            <DemoCard
              name="Recipes"
              src={require("../assets/images/recipes.jpg")}
              animation="bouncy"
              size="$4"
              width={200}
              height={200}
              scale={0.9}
              hoverStyle={{ scale: 0.925 }}
              pressStyle={{ scale: 0.875 }}
            />
            <DemoCard
              name="Planner"
              src={require("../assets/images/planner.jpg")}
              animation="bouncy"
              size="$4"
              width={200}
              height={200}
              scale={0.9}
              hoverStyle={{ scale: 0.925 }}
              pressStyle={{ scale: 0.875 }}
            />
          </XStack>
          <XStack gap="$3">
            <DemoCard
              name="Cravings and Adversions"
              src={require("../assets/images/cravings.jpg")}
              animation="bouncy"
              size="$4"
              width={200}
              height={200}
              scale={0.9}
              hoverStyle={{ scale: 0.925 }}
              pressStyle={{ scale: 0.875 }}
            />
          </XStack>
        </YStack>
      }
    </View>
  );
}

export function DemoCard({ name, src, ...props }: { name: string, src: any } & CardProps) {
  return (
    <Card elevate size="$4" bordered {...props}>
      <Card.Header padded>
        <Text
          color="white"
          style={{ textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black" }}
          fontWeight="500"
          fontSize="32px"
        >
          {name}
        </Text>
      </Card.Header>
      <Card.Background>
        <Image
          resizeMode="contain"
          alignSelf="center"
          // source={{
          //   width: 300,
          //   height: 300,
          //   uri: path
          // }}
          source={src}
          style={{ width: 200, height: 200 }}
        />
      </Card.Background>
    </Card>
  )
}