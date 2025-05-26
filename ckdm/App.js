import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pantallas de autenticación
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';

// Pantallas principales (importa tus pantallas reales aquí)
import HomeScreen from './src/screens/Home/HomeScreen';
import NewPredictionScreen from './src/screens/Predictions/NewPredictionScreen';
import PreviousPredictionsScreen from './src/screens/Predictions/PreviousPredictionsScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import Ayuda from './src/screens/Help/Ayuda';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true, // Mostrar header en todas las pantallas
            headerTitleAlign: 'center',
            animation: 'fade',
          }}
        >
          {isLoggedIn ? (
            // Pantallas cuando el usuario está autenticado
            <>
              <Stack.Screen 
                name="Home" 
                component={HomeScreen}
                options={{ 
                  title: 'Inicio',
                  headerRight: () => (
                    <View style={{ marginRight: 15 }}>
                      <Text onPress={() => setIsLoggedIn(false)}>Cerrar sesión</Text>
                    </View>
                  )
                }}
              />
              <Stack.Screen 
                name="NuevaPrediccion" 
                component={NewPredictionScreen}
                options={{ title: 'Nueva Predicción' }}
              />
              <Stack.Screen 
                name="PrediccionesAnteriores" 
                component={PreviousPredictionsScreen}
                options={{ title: 'Predicciones Anteriores' }}
              />
              <Stack.Screen 
                name="Perfil" 
                component={ProfileScreen}
                options={{ title: 'Perfil' }}
              />
              <Stack.Screen 
                name="Ayuda" 
                component={Ayuda}
                options={{ title: 'Centro de ayuda' }}
              />
            </>
          ) : (
            // Pantallas cuando el usuario NO está autenticado
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