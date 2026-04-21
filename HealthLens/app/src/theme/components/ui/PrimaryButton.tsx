import { Pressable, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import globalStyles from '../../../../styles/globalStyles';
import { Image } from 'react-native';


export default function PrimaryButton(props) {
    return (
        <Pressable style={{ flexDirection: 'row', justifyContent: 'center'}} onPress={props.onPress}>
            <LinearGradient
                colors={props.color}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[globalStyles.button, props.style, {flexDirection: "row"}]}
            >
                {props.icon && <Image source={props.icon} style={{ width: 20, height: 20, marginRight: 8 }} />}
                <Text 
                    style={{ 
                        color: '#FFFFFF', 
                        fontFamily: 'Monda' 
                    }}
                    numberOfLines={1} 
                    adjustsFontSizeToFit
                >
                    {props.label}
                </Text>
            </LinearGradient>
        </Pressable>
    );
}