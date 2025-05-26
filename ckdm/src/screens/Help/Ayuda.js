import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Picker, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AppMenu from '../../components/AppMenu';

const Ayuda = ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState('');

  const faqAnswers = {
    perfil: 'Para editar tu perfil, dirígete a la sección "Mi Perfil" desde el menú y presiona el botón de editar en la parte superior.',
    contrasena: 'Para recuperar tu contraseña, selecciona "¿Olvidaste tu contraseña?" en la pantalla de inicio de sesión y sigue las instrucciones.',
    datos: 'Tus datos médicos se almacenan de forma segura y se utilizan únicamente para generar predicciones personalizadas.',
    predicciones: 'Puedes ver tus predicciones anteriores en la sección "Historial" desde el menú principal.',
  };

  const handleMenuNavigation = (screen) => {
    navigation.navigate(screen);
    setIsMenuVisible(false);
  };

  return (
    <View style={styles.mainContainer}>
      {/* Header con botón de menú */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={() => setIsMenuVisible(true)}>
          <Text style={styles.menuButtonText}>☰ Menú</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ayuda</Text>
      </View>

      {/* Menú Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <View style={styles.menuContainer}>
          <AppMenu 
            navigation={navigation} 
            onClose={() => setIsMenuVisible(false)}
            onItemPress={handleMenuNavigation}
          />
        </View>
      </Modal>

      {/* Contenido principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>¿Cómo podemos ayudarte?</Text>

        <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>

        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedFAQ}
            onValueChange={(itemValue) => setSelectedFAQ(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione una pregunta..." value="" />
            <Picker.Item label="¿Cómo edito mi perfil de usuario?" value="perfil" />
            <Picker.Item label="¿Cómo recupero mi contraseña?" value="contrasena" />
            <Picker.Item label="Acerca de los datos procesados" value="datos" />
            <Picker.Item label="Acerca de mis predicciones" value="predicciones" />
          </Picker>
        </View>

        {selectedFAQ !== '' && (
          <View style={styles.answerBox}>
            <Text style={styles.answerText}>{faqAnswers[selectedFAQ]}</Text>
          </View>
        )}

        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contáctenos</Text>
          <MaterialIcons name="email" size={28} color="#333" />
          <Text style={styles.emailLabel}>E-mail</Text>
          <Text style={styles.email}>kidney.support@gmail.com</Text>
        </View>
      </ScrollView>
    </View>
  );
};

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
  },
  menuContainer: {
    flex: 1,
    width: '70%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
    textAlign: 'center',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  answerBox: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  answerText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
  contactContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emailLabel: {
    fontSize: 16,
    marginTop: 10,
    color: '#444',
  },
  email: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default Ayuda;
