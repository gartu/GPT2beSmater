/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Parameters} from './app/screen/parameters/Parameters';
import screens from './app/screen/screens';
import {Help} from './app/screen/help/Help';
import {Preferences} from './app/screen/preferences/Preferences';
import {Interaction} from './app/screen/interaction/Interaction';
import {ThemeProvider} from '@rneui/themed';
import theme from './app/core/theme/theme';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Drawer = createDrawerNavigator();

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
        </SafeAreaView>
        <Drawer.Navigator initialRouteName={screens.interaction}>
          <Drawer.Screen
            name={screens.interaction}
            component={Interaction}
            options={{title: 'Chat'}}
          />
          <Drawer.Screen
            name={screens.preferences}
            component={Preferences}
            options={{title: 'Préférences'}}
          />
          <Drawer.Screen
            name={screens.parameters}
            component={Parameters}
            options={{title: 'Paramètres'}}
          />
          <Drawer.Screen
            name={screens.help}
            component={Help}
            options={{title: 'Aide'}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
    /*
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>test</Text>
        </View>
      </ScrollView>
    </SafeAreaView>*/
  );
}

export default App;
