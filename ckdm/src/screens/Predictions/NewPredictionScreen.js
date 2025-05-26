import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import AppMenu from '../../components/AppMenu';

const NewPredictionScreen = ({ navigation }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [formData, setFormData] = useState({
    hemo: '',
    pcv: '',
    sg: '',
    rc: '',
    al: '',
    bgr: '',
    bu: '',
    sod: '',
    su: '',
    sc: '',
    bp: '',
    wc: '',
    age: ''
  });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMenuNavigation = (screen) => {
    navigation.navigate(screen);
    setIsMenuVisible(false);
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({...prev, [name]: value}));
  };

  const simulatePrediction = () => {
    setIsLoading(true);
    setResult(null);
    
    setTimeout(() => {
      const ageNum = parseFloat(formData.age);
      
      if (ageNum === 0 || ageNum === 100) {
        setResult({ 
          error: true,
          message: '¡Datos posiblemente incorrectos, por favor revisarlos!',
          details: ' Por favor verifique la información del paciente.'
        });
      } else {
        const predefinedCases = {
          62: { prediction: 'no CKD', probability: 8.9, risk: 'bajo' },
          90: { prediction: 'CKD', probability: 97.7, risk: 'alto' },
          68: { prediction: 'CKD', probability: 99.2, risk: 'crítico' },
        };

        setResult(predefinedCases[ageNum] || { 
          prediction: 'No concluyente', 
          probability: 50,
          risk: 'moderado'
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.mainContainer}>
      {/* Header con botón de menú */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setIsMenuVisible(true)}
        >
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Predicción CKD</Text>
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
        <Text style={styles.title}>Ingrese los datos del paciente</Text>
        
        {/* Formulario de entrada */}
        <View style={styles.formContainer}>
          {Object.keys(formData).map((key) => (
            <View key={key} style={styles.inputContainer}>
              <Text style={styles.label}>{key.toUpperCase()}</Text>
              <TextInput
                style={styles.input}
                value={formData[key]}
                onChangeText={(text) => handleInputChange(key, text)}
                keyboardType="numeric"
                placeholder={`Ingrese ${key}`}
                placeholderTextColor="#999"
              />
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.predictButton}
          onPress={simulatePrediction}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.predictButtonText}>Generar Predicción</Text>
          )}
        </TouchableOpacity>

        {/* Resultados */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3498db" />
            <Text style={styles.loadingText}>Analizando datos médicos...</Text>
          </View>
        ) : result && (
          <View style={[
            styles.resultContainer,
            result.error ? styles.errorContainer : 
              result.prediction === 'CKD' ? styles.ckdContainer : styles.noCkdContainer
          ]}>
            {result.error ? (
              <>
                <MaterialIcons name="error-outline" size={50} color="#e74c3c" />
                <Text style={styles.resultTitleError}>{result.message}</Text>
                <Text style={styles.resultDetails}>{result.details}</Text>
              </>
            ) : (
              <>
                <LinearGradient
                  colors={result.prediction === 'CKD' ? ['#e74c3c', '#c0392b'] : ['#2ecc71', '#27ae60']}
                  style={styles.resultHeader}
                >
                  <Text style={styles.resultTitle}>
                    {result.prediction === 'CKD' ? 'RIESGO DETECTADO' : 'SIN RIESGO'}
                  </Text>
                </LinearGradient>
                
                <View style={styles.resultBody}>
                  <View style={styles.probabilityContainer}>
                    <Text style={styles.probabilityValue}>{result.probability}%</Text>
                    <Text style={styles.probabilityLabel}>Probabilidad</Text>
                  </View>
                  
                  <View style={styles.riskIndicator}>
                    <View style={[
                      styles.riskLevel, 
                      { 
                        width: `${result.probability}%`,
                        backgroundColor: result.prediction === 'CKD' ? 
                          (result.risk === 'crítico' ? '#c0392b' : '#e74c3c') : '#2ecc71'
                      }
                    ]} />
                  </View>
                  
                  <View style={styles.riskInfo}>
                    <MaterialIcons 
                      name={result.prediction === 'CKD' ? 'warning' : 'check-circle'} 
                      size={24} 
                      color={result.prediction === 'CKD' ? '#e74c3c' : '#2ecc71'} 
                    />
                    <Text style={styles.riskText}>
                      Riesgo {result.risk} de enfermedad renal crónica
                    </Text>
                  </View>
                  
                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>Ver detalles completos</Text>
                    <MaterialIcons name="chevron-right" size={20} color="#3498db" />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2c3e50',
    elevation: 3,
  },
  menuButton: {
    padding: 8,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 15,
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
    padding: 25,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 25,
    color: '#2c3e50',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 25,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontWeight: '500',
    marginBottom: 8,
    color: '#34495e',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dfe6e9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    color: '#2d3436',
  },
  predictButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 2,
    height: 55,
    justifyContent: 'center',
  },
  predictButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginTop: 10,
  },
  loadingText: {
    marginTop: 15,
    color: '#7f8c8d',
    fontSize: 16,
  },
  resultContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  ckdContainer: {
    backgroundColor: '#fff',
  },
  noCkdContainer: {
    backgroundColor: '#fff',
  },
  errorContainer: {
    backgroundColor: '#fdeaea',
    padding: 25,
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#e74c3c',
  },
  resultHeader: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  resultTitleError: {
    color: '#e74c3c',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  resultDetails: {
    color: '#7f8c8d',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  resultBody: {
    padding: 20,
  },
  probabilityContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  probabilityValue: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  probabilityLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
  riskIndicator: {
    height: 10,
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
    marginVertical: 15,
    overflow: 'hidden',
  },
  riskLevel: {
    height: '100%',
    borderRadius: 5,
  },
  riskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ecf0f1',
  },
  riskText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#34495e',
    flex: 1,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  detailsButtonText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default NewPredictionScreen;