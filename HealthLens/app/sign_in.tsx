import { Text, View, StyleSheet, TextInput, Pressable, Image, useWindowDimensions, ScrollView} from "react-native";
import globalStyles from './styles/globalStyles';
import { useFonts } from 'expo-font';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {Stack} from "expo-router"

export default function SignIn() {
    const { width, height } = useWindowDimensions();
    const [fontsLoaded] = useFonts({
        'Monda': require('./styles/fonts/Monda.ttf'),
      });
    return (
      <ScrollView 
        contentContainerStyle={[globalStyles.scrollContent]}
        style= {globalStyles.bgColor}
        >
            <Stack.Screen options= {{headerShown: false}}/>{""}
            <Image 
            source={require('../assets/images/healthlens-logo.png')}
            style={[{ width: width * 0.65, height: height * .3, margin: 30}]}
            resizeMode="contain"
            />
            <View style={[globalStyles.card, { width: width * 0.85, aspectRatio: 1.29, margin: 0, fontFamily: 'Monda'}]}>
                <Text style={{color: '#ADADAD', fontSize: RFValue(16)}}>Email</Text>
                <TextInput style={globalStyles.input} placeholder="Your Email"></TextInput>
                <Text style={{color: '#ADADAD', fontSize: RFValue(16)}}>Password</Text>
                <TextInput style={globalStyles.input} placeholder="Your Password"></TextInput>
                <Pressable style={globalStyles.button}>
                    <Text style={{color: '#FFFFFF'}}>Log In</Text>
                </Pressable>
            </View>
      </ScrollView>
    );
  }

const styles = StyleSheet.create({
    
      

})
