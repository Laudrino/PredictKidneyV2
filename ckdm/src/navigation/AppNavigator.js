import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StatusBar, View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pantallas de autenticación
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';

// Pantallas principales
import HomeScreen from './src/screens/Home/HomeScreen';
import NewPredictionScreen from './src/screens/Predictions/NewPredictionScreen';
import PreviousPredictionsScreen from './src/screens/Predictions/PreviousPredictionsScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import Ayuda from './src/screens/Help/Ayuda';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerTitleAlign: 'center',
            animation: 'fade',
          }}
        >
          {isLoggedIn ? (
            // PANTALLAS AUTENTICADAS
            <>
              <Stack.Screen 
                name="Home" 
                component={HomeScreen}
                options={{ 
                  title: 'Inicio',
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                      <Text>☰</Text>
                    </TouchableOpacity>
                  )
                }}
              />
              
              <Stack.Screen 
                name="NuevaPrediccion" 
                component={NewPredictionScreen}
                options={{ 
                  title: 'Nueva Predicción',
                  headerBackTitle: 'Atrás'
                }}
              />
              
              <Stack.Screen 
                name="PrediccionesAnteriores" 
                component={PreviousPredictionsScreen}
                options={{ 
                  title: 'Predicciones Anteriores',
                  headerBackTitle: 'Atrás'
                }}
              />
              
              <Stack.Screen 
                name="Perfil" 
                component={ProfileScreen}
                options={{ 
                  title: 'Perfil de Usuario',
                  headerBackTitle: 'Atrás'
                }}
              />
              <Stack.Screen 
                name="Ayuda" 
                component={Ayuda}
                options={{ 
                  title: 'Centro de ayuda',
                  headerBackTitle: 'Atrás'
                }}
              />
            </>
          ) : (
            // PANTALLAS NO AUTENTICADAS
            <>
              <Stack.Screen 
                name="Login" 
                options={{ headerShown: false }}
              >
                {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
              </Stack.Screen>
              
              <Stack.Screen 
                name="Register" 
                options={{ title: 'Registro' }}
              >
                {(props) => <RegisterScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}