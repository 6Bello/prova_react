import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ScrollView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AddUser from './screen/addUser';
import Users from './screen/users';





const Tab = createBottomTabNavigator();


export default function App() {


  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Users} />
        <Tab.Screen name="Settings" component={AddUser} />
      </Tab.Navigator>
    </NavigationContainer>

  );
}

