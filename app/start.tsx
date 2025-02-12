import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Platform } from 'react-native';
import { YStack, Text, H1, H3, Paragraph, RadioGroup, ScrollView, XStack, Label, SizeTokens, View, Button } from 'tamagui';

const questions = [
  { question: "Who is pregnant?", options: ["I am", "My partner", "Just here to explore"] },
  { question: "How many weeks:", options: ["1 - 13", "14 - 26", "27-39"] },
  { question: "My diet is:", options: ["Omnivore", "Vegetarian", "Vegan", "Pescatarian"] },
]

export default function StartScreen() {
  const [checked, setChecked] = useState('first');
  const [answers, setAnswers] = useState([] as string[]);
  const [currQuestion, setCurrQuestion] = useState(0);
  const router = useRouter();

  return (
    <View>
      <YStack padding={20}>
        <H3>Welcome to BumpBites!</H3>
        <Text>Let's personalize your experience</Text>
      </YStack>
      <YStack padding={20} gap="$3">
        <H3>{questions[currQuestion].question}</H3>
        {questions[currQuestion].options.map((option, index) => {
          return (
            <Button key={index} size="$3" variant="outlined" onPress={() => {
              setAnswers([...answers, option]);
              if (currQuestion < questions.length) {
                setCurrQuestion(currQuestion + 1);
              } else {
                router.push('/home');
              }
            }}>
              {option}
            </Button>
          )
        })}
        {
          currQuestion === questions.length &&
          <Button onPress={() => console.log(answers)}>Submit</Button>
        }
      </YStack>
    </View>
  );
}

