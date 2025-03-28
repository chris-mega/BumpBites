
import React, { useState, useEffect } from 'react';
import { YStack, H1, Paragraph, View, Card, H3, XStack, Button, Image, CardProps, Text, SizableText } from 'tamagui';
import StartScreen from './start';
import { RelativePathString, useRouter } from 'expo-router';
import { getData } from '../scripts/dataHandling';
import { UserInterface } from '../scripts/interfaces';
import LoadingScreen from '../components/loadingScreen';

export default function HomeScreen() {
  const [user, setUser] = useState({} as UserInterface);
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const userData = await getData('user');
      setUser(userData);
      setSignedIn(!!userData?.id);
      setLoading(false);
    };
    checkUser();
  }, [])

  if (loading) {
    return <LoadingScreen />
  } else {
    return (
      <View>
        {!signedIn ? <StartScreen setUser={setUser} setSignedIn={setSignedIn} /> :
          <YStack padding={20}>
            <XStack gap="$3">
              <DemoCard
                name="Recipes"
                route="/recipes"
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
                route="/planner"
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
                route="/cravings"
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
}

export function DemoCard({ name, src, route, ...props }: { name: string, route: string, src: any } & CardProps) {
  const router = useRouter();
  return (
    <Card elevate size="$4" bordered {...props} onPress={() => router.push(route as RelativePathString)}>
      <Card.Header padded>
        <SizableText
          color="white"
          fontWeight="500"
          size="$9"
        >
          {name}
        </SizableText>
      </Card.Header>
      <Card.Background>
        <Image
          alignSelf="center"
          source={src}
          style={{ width: 200, height: 200 }}
        />
      </Card.Background>
    </Card>
  )
}