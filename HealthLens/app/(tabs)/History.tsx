import { Text, View, StyleSheet, Image, ScrollView, Dimensions, StatusBar } from "react-native";

export default function History() {
  const screenHeight = Dimensions.get('window').height;
  
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.title}>User's Name</Text>
        <Text style={styles.subtitle}>Based on your recent results, you most likely have x disease. </Text>
      </View>

      <View style={styles.confidenceSection}>
        <Text>Confidence (X%)</Text>
        <View style={styles.confidenceBar}></View>
      </View>

      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Recent History</Text>
        <ScrollView style={[styles.historyList, { height: screenHeight * 0.3 }]}>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <View key={index} style={styles.component}>
              <Text style={styles.componentText}>History Item {item}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60, 
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confidenceSection: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  historySection: {
    alignItems: 'center',
    width: '100%',
    flex: 1, 
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  historyList: {
    backgroundColor: '#E0D7D7',
    width: '100%',
    borderRadius: 8,
    padding: 10,
    height: 250, // Fixed height instead of percentage
  },
  component: {
    backgroundColor: '#DEDCDC',
    width: '100%',
    padding: 24,
    borderRadius: 4,
    marginBottom: 10,
  },
  componentText: {
    fontSize: 16,
    color: '#333',
  },
  confidenceBar: {
    width: '100%',
    backgroundColor: '#E0D7D7',
    height: 30,
  }
});