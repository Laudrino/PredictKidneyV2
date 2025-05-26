import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import AppMenu from '../../components/AppMenu';

const HomeScreen = ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <View style={styles.mainContainer}>
      {/* Header con botón de menú */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setIsMenuVisible(true)}
        >
          <Text style={styles.menuButtonText}>☰ Menú</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chronic Kidney Disease</Text>
      </View>

      {/* Menú Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={() => setIsMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <AppMenu 
              navigation={navigation}  // Asegúrate de pasar navigation aquí
              onClose={() => setIsMenuVisible(false)}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Resto del código... */}
         {/* Contenido principal */}
         <ScrollView style={styles.container}>
        <Image
          source={require('../../../assets/icon.jpeg')}
          style={styles.logo}
        />
        
        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>¿Qué es la Insuficiencia renal?</Text>
          <Text style={styles.text}>
            Se dice que una persona tiene insuficiencia renal si la función renal disminuye a menos de un 15 por ciento de lo normal. 
            Es posible sentir síntomas por la acumulación de toxinas y el exceso de agua en el organismo.
          </Text>
        </View>
        
        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>¿Qué hacemos?</Text>
          <Text style={styles.text}>
            Somos un equipo dedicado a ayudar en la detección temprana de la Enfermedad Renal Crónica (CKD) mediante algoritmos predictivos.
          </Text>
        </View>
        
        <View style={styles.contentBox}>
          <Text style={styles.sectionTitle}>¿Cómo funciona?</Text>
          <Text style={styles.text}>
            Nuestra aplicación analiza tus datos médicos para predecir el riesgo de desarrollar CKD. 
            Solo necesitas ingresar algunos valores y nuestro sistema hará el resto.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

// Estilos permanecen igual...

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007bff',
    paddingTop: 40, // Para dispositivos con notch
  },
  menuButton: {
    padding: 8,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    flex: 1,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    width: '70%',
    height: '100%',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
    borderRadius: 10,
  },
  contentBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: '#495057',
  },
});

export default HomeScreen;