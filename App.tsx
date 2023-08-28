// import { View, Text } from 'react-native'
// import React from 'react'
// import Route from './components/Routes/Route'

// export default function App() {
//   return (
//     <View>
//       <Route/>
//     </View>
//   )
// }
// In App.js in a new project

import { View, Text } from 'react-native'
import React from 'react'
import LandingPage from './components/Screens/LandingPage';
import CardPage from './components/Screens/CardPage';
import BoardPage from './components/Screens/BoardPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="LandingPage">
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="BoardPage" component={BoardPage} />
      <Stack.Screen name="CardPage" component={CardPage} />
    </Stack.Navigator>
  </NavigationContainer>

  );
}

export default App;