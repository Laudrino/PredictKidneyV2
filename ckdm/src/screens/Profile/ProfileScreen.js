import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import AppMenu from '../../components/AppMenu';

const ProfileScreen = ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Datos del usuario
  const [userData, setUserData] = useState({
    nombre: 'Juan',
    apellidos: 'Pérez Gómez',
    email: 'juanperez@example.com',
    password: '********',
    miembroDesde: 'Enero 2023',
    predicciones: 3,
  });

  // Función para actualizar los datos del usuario
  const handleSaveChanges = () => {
    // Aquí puedes agregar lógica para guardar los cambios (por ejemplo, actualizar en una base de datos)
    setIsEditing(false);  // Desactivar el modo de edición
  };

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
        <Text style={styles.headerTitle}>Mi Perfil</Text>
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
              navigation={navigation}
              onClose={() => setIsMenuVisible(false)}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Contenido principal con scroll */}
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../../assets/icon.jpeg')}
          style={styles.avatar}
        />

        {/* Editar nombre */}
        <TextInput
          style={styles.input}
          value={userData.nombre}
          onChangeText={(text) => setUserData({...userData, nombre: text})}
          editable={isEditing}
        />

        {/* Editar apellidos */}
        <TextInput
          style={styles.input}
          value={userData.apellidos}
          onChangeText={(text) => setUserData({...userData, apellidos: text})}
          editable={isEditing}
        />


        {/* Contraseña (no editable por razones de seguridad) */}
        <Text style={styles.infoLabel}>Contraseña:</Text>
        <Text style={styles.infoValue}>{userData.password}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Correo electrónico:</Text>
          <Text style={styles.infoValue}>{userData.email}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Miembro desde:</Text>
          <Text style={styles.infoValue}>{userData.miembroDesde}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Predicciones realizadas:</Text>
          <Text style={styles.infoValue}>{userData.predicciones}</Text>
        </View>

        {/* Botón para guardar los cambios */}
        {isEditing ? (
          <TouchableOpacity onPress={handleSaveChanges} style={styles.button}>
            <Text style={styles.buttonText}>Guardar cambios</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.button}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        )}
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
    paddingTop: 40,
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
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  container: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 60,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
