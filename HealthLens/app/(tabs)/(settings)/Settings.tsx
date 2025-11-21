import { Text, View, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { router } from 'expo-router'
export default function Settings() {
  const screenHeight = Dimensions.get('window').height;
  const handleSettingsPress = () => {
    router.push('../Profile');
  }
  
  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={handleSettingsPress} style={styles.topBar}>
        <Image
        style={styles.backPng}
        source={require('../../../assets/settings/images/back.png')}
        />
    </TouchableOpacity>

      <View style={styles.profileSection}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.historySection}>
        <ScrollView style={[styles.historyList, { height: screenHeight * 0.3 }]}>
            <View style={styles.component}>
              <Text style={styles.componentText}>Account & Policy</Text>
            </View>
            <View style={styles.component}>
              <Text style={styles.componentText}>Manage Data</Text>
            </View>
            <View style={styles.component}>
              <Text style={styles.componentText}>Dark Mode & Appearences</Text>
            </View>
            <View style={styles.component}>
              <Text style={styles.componentText}>Notifications</Text>
            </View>
            <View style={styles.component}>
              <Text style={styles.componentText}>Delete Account</Text>
            </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60, 
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20, 
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    padding: 10,
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
    width: '100%',
    borderRadius: 8,
    height: 250, // Fixed height instead of percentage
  },
  component: {
    width: '100%',
    padding: 24,
    borderTopWidth: 0.5,
  },
  componentText: {
    fontSize: 18,
    color: '#333',
  },
  backPng: {
    height: 25,
    width: 25,
    position: 'absolute',
    marginLeft: 20,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 20,
    marginBottom: 20,
  }
});