import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContent: {
    alignItems: "center",      
    paddingTop: 10,            
    paddingBottom: 10,
    width: '100%'        
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
    padding: '4%',
    flex: 1,
    justifyContent: "space-evenly",
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#EEF2F7',
    borderRadius: 30,
    margin: '2%',
    padding: '3%',
    color: '#9C9C9C'
  },

  button: {
    color: '#FFFFFF',
    backgroundColor: '#5187DD',
    borderRadius: 30,
    margin: '4%',
    width: '80%',
    height: '50%',
    padding: '3%',
    justifyContent: "center",
    alignItems: "center"
  },
  
  });