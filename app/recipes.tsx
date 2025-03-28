import LoadingScreen from '@/components/loadingScreen';
import { getData, getLuckyRecipe } from '@/scripts/dataHandling';
import React, { useEffect, useState } from 'react';
import { H1, H2, Paragraph, YStack, ListItem, XStack, Text, ScrollView, H3 } from 'tamagui';

interface RecipeInterface {
  title: string;
  ingredients: string[];
  instructions: string[];
  nutritional_breakdown: {
    [key: string]: string;
  };
}

export default function RecipesScreen() {
  const [recipe, setRecipe] = useState({} as RecipeInterface);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const user = await getData('user');
      const data = await getLuckyRecipe(user.id);
      setRecipe(data as RecipeInterface);
      setLoading(false);
    }
    fetchRecipes();
  }, [])

  if (loading) {
    return <LoadingScreen />
  } else {
    return (
      <ScrollView>
        <YStack padding={20}>
          <H1>Recipes</H1>
          <YStack padding={20} space="$4">
            <H2>{recipe.title}</H2>

            <H3>Ingredients</H3>
            <YStack space="$2">
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index}>{ingredient}</ListItem>
              ))}
            </YStack>

            <H3>Instructions</H3>
            <YStack space="$2">
              {recipe.instructions.map((instruction, index) => (
                <Paragraph key={index}>
                  {instruction}
                </Paragraph>
              ))}
            </YStack>

            <H3>Nutritional Breakdown</H3>
            <YStack space="$2">
              {Object.entries(recipe.nutritional_breakdown).map(([key, value], index) => (
                <XStack key={index} justifyContent="space-between">
                  <Text fontWeight="bold">{key}:</Text>
                  <Text>{value}</Text>
                </XStack>
              ))}
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
    );
  }
}
