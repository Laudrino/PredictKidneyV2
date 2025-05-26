import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AppMenu = ({ navigation, onClose }) => {
  const menuItems = [
    { title: 'Inicio', screen: 'Home' },
    { title: 'Nueva Predicción', screen: 'NuevaPrediccion' },
    { title: 'Predicciones Anteriores', screen: 'PrediccionesAnteriores' },
    { title: 'Perfil', screen: 'Perfil' },
    { title: 'Ayuda', screen: 'Ayuda' },
  ];

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
    onClose && onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.menuTitle}>Menú Principal</Text>
      {menuItems.map((item, index) => (
        <TouchableOpacity 
          key={index}
          style={styles.menuItem}
          onPress={() => handleNavigation(item.screen)}
        >
          <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});

export default AppMenu;