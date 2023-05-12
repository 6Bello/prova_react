import {React, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TextInput, Button, Text, ScrollView, FlatList} from 'react-native';

const Tab = createBottomTabNavigator();

export default function prova() {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Text>prova</Text>
      </Tab.Navigator>
    </NavigationContainer>
  );
}