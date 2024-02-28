/*
 * File: App.java
 * Author: Hajdara Patrik
 * Copyright: 2024, Hajdara Patrik
 * Group: SZOFT II/2/N
 * Date: 2024-02-28
 * Github: https://github.com/06776/
 * Licenc: GNU GPL
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const BodyMassIndexCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [history, setHistory] = useState([]);

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h) || h <= 0) {
      setBmi("Nincsenek megadott vagy érvényes adatok");
    } else {
      const hInMeter = h / 100;
      const calculatedBmi = w / (hInMeter * hInMeter);
      setBmi(calculatedBmi.toFixed(2));
      setHistory([
        ...history,
        { weight: w, height: h, bmi: calculatedBmi.toFixed(2) },
      ]);
    }
  };

  const clearData = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const renderHistory = () => {
    return history.map((item, index) => (
      <View key={index} style={styles.historyItem}>
        <Text
          style={styles.historyText}
        >{`Testtömeg: ${item.weight}, Magasság: ${item.height}, Eredmény: ${item.bmi}`}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/bmi_index.png")} style={styles.logo} />
        <TouchableOpacity onPress={() => setHistoryModalVisible(true)}>
          <AntDesign name="clockcircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setWeight(text)}
        value={weight}
        placeholder="Adja meg a testtömegét (kg)"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setHeight(text)}
        value={height}
        placeholder="Adja meg a testmagasságát (m)"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.calculateButton} onPress={calculateBmi}>
        <Text style={styles.buttonText}>Számolás</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={clearData}>
        <Text style={styles.buttonText}>Adatok törlése</Text>
      </TouchableOpacity>
      {bmi && <Text style={styles.result}>A testtömegindex: {bmi}</Text>}
      <Modal
        animationType="slide"
        transparent={true}
        visible={historyModalVisible}
        onRequestClose={() => {
          setHistoryModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Előzmények</Text>
            {renderHistory()}
          </ScrollView>
          <TouchableOpacity
            style={styles.clearHistoryButton}
            onPress={clearHistory}
          >
            <Text style={styles.buttonTextRed}>Előzmények törlése</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setHistoryModalVisible(false)}
          >
            <Text style={styles.buttonText}>Bezárás</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.footer}>
        <Text style={styles.footerText}>&copy; 2024 | Hajdara Patrik</Text>
        <Text style={styles.footerText}>BZSH Külkereskedelmi Technikum</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4F7FD",
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  input: {
    height: 45,
    width: "58%",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
  },
  calculateButton: {
    backgroundColor: "#61B329",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonTextGreen: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonTextRed: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    backgroundColor: "#F2F2F2",
  },
  historyText: {
    color: "#333333",
    fontSize: 16,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  historyContainer: {
    maxHeight: "80%",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  clearHistoryButton: {
    backgroundColor: "#FF6347",
    padding: 15,
  },
  closeModalButton: {
    backgroundColor: "#61B329",
    padding: 15,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
  },
  footerText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
});

export default BodyMassIndexCalculator;
