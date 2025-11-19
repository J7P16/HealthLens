import { Text, View, StyleSheet, Image, ScrollView, Dimensions, StatusBar } from "react-native";

export default function Profile() {
  const screenHeight = Dimensions.get('window').height;
  
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.title}>User's Name</Text>
        <Image 
          style={styles.profileImage}
          source={{uri: 'https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHUyMzMxNjM2LWltYWdlLTAxLXJtNTAzXzMtbDBqOXFrNnEucG5n.png'}}
        />
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
    justifyContent: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginTop: 20,
    borderWidth: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  historySection: {
    alignItems: 'center',
    width: '100%',
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
  },
  component: {
    backgroundColor: '#DEDCDC',
    width: '100%',
    padding: 20,
    borderRadius: 4,
    marginBottom: 10,
  },
  componentText: {
    fontSize: 16,
    color: '#333',
  }
});