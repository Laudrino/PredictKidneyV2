import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import AppMenu from '../../components/AppMenu';

const PreviousPredictionsScreen = ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  
  // Datos de ejemplo
  const predictions = [
    { id: '1', date: '2023-05-15', result: 'Riesgo bajo' },
    { id: '2', date: '2023-04-10', result: 'Riesgo moderado' },
    { id: '3', date: '2023-03-05', result: 'Riesgo bajo' },
  ];

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
        <Text style={styles.headerTitle}>Predicciones Anteriores</Text>
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

      {/* Contenido principal */}
      <View style={styles.container}>
        {predictions.length > 0 ? (
          <FlatList
            data={predictions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.predictionItem}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.result}>{item.result}</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyText}>No hay predicciones anteriores</Text>
        )}
      </View>
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
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  predictionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 16,
  },
  result: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default PreviousPredictionsScreen;