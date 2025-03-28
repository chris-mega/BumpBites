import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Platform } from 'react-native';
import { YStack, Text, H1, H3, Paragraph, RadioGroup, ScrollView, XStack, Label, SizeTokens, View, Button, Input } from 'tamagui';
import { UserInterface } from '../scripts/interfaces';
import { saveData } from '../scripts/dataHandling';

const questions = [
  { question: "What is your name?", options: [] },
  { question: "Who is pregnant?", options: ["I am", "My partner", "Just here to explore"] },
  { question: "How many weeks:", options: ["1 - 13", "14 - 26", "27-39"] },
  { question: "My diet is:", options: ["Omnivore", "Vegetarian", "Vegan", "Pescatarian"] },
]

interface StartScreenProps {
  setUser: (user: UserInterface) => void;
  setSignedIn: (signedIn: boolean) => void;
}

export default function StartScreen({ setUser, setSignedIn }: StartScreenProps) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [currQuestion, setCurrQuestion] = useState(0);
  const [currAnswer, setCurrAnswer] = useState('');
  const router = useRouter();

  const handleButton = () => {
    const oldAnswers = [...answers];
    oldAnswers[currQuestion] = currAnswer;
    setAnswers(oldAnswers);
    if (currQuestion < questions.length - 1) {
      setCurrQuestion(currQuestion + 1);
    } else {
      const userData = { id: "1", name: answers[0] };
      saveData('user', userData);
      setUser(userData as UserInterface);
      setSignedIn(true);
    }
  }

  return (
    <View>
      <YStack padding={20}>
        <H3>Welcome to BumpBites!</H3>
        <Text>Let's personalize your experience</Text>
      </YStack>
      <YStack padding={20} gap="$3">
        <H3>{questions[currQuestion].question}</H3>
        {questions[currQuestion].options.length === 0 ? <Input
          placeholder="Enter your name"
          onChangeText={(text) => {
            setCurrAnswer(text);
          }}
        /> : questions[currQuestion].options.map((option, index) => {
          return (
            <Button
              key={index}
              size="$3"
              theme="light_pink"
              variant={currAnswer === option ? undefined : "outlined"}
              onPress={() => {
                setCurrAnswer(option);
              }}
            >
              {option}
            </Button>
          )
        })}
        <Button theme="light-pink" themeInverse onPress={() => handleButton()}>
          {currQuestion === questions.length ?
            "Finish" : "Next"}
        </Button>
      </YStack>
    </View>
  );
}

