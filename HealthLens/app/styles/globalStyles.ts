import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContent: {
    flex: 1,
    alignItems: "center",      
    paddingTop: 10,            
    paddingBottom: 10,        
  },

  bgColor: {
    backgroundColor: '#EEF2F7',
  },

  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    shadowColor: '#93A0BA',
    shadowRadius: 20,
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    padding: 20,
    flex: 1
  },

  input: {
    backgroundColor: '#EEF2F7',
    borderRadius: 30,
    margin: 20,
    height: 40,
    padding: 20,
    color: '#9C9C9C'
  },

  button: {
    color: 'FFFFFF',
    backgroundColor: '#5187DD',
    borderRadius: 30,
    margin: 20,
    height: 40,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  
  });