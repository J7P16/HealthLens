import { Text, View, StyleSheet, TextInput, Pressable, Image, useWindowDimensions, ScrollView} from "react-native";
import { useState } from 'react';
import {Stack, router} from "expo-router"
import { InputField } from '@/src/components/ui/InputField';
import { PrimaryButton } from '@/src/components/ui/PrimaryButton';
import { SecondaryButton } from '@/src/components/ui/SecondaryButton';
import { Screen } from '@/src/components/ui/Screen';
import { SocialButton } from '@/src/components/ui/SocialButton';
import { routes } from '@/src/constants/routes';
import { useAppTheme } from '@/src/hooks/useAppTheme';
import { spacing } from '@/src/theme';
import * as LightTheme from '../src/theme/lightTheme';
import * as DarkTheme from '../src/theme/darkTheme';
import * as Colors from '../src/theme/tokens/colors';
import * as Spacing from '../src/theme/tokens/spacing';
import * as Radius from '../src/theme/tokens/radius';
import * as Typography from '../src/theme/tokens/typography';
import * as Sizes from '../src/theme/tokens/sizes';
import * as Shadows from '../src/theme/tokens/shadows';
import * as Gradients from '../src/theme/tokens/gradients';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";


export default function UploadPicture() {
    const { width, height } = useWindowDimensions();
    const [photoUploaded, setPhotoUploaded] = useState(false);
    const theme = useAppTheme('light');

    const isCompact = width < 390;
    const isWide = width >= 900;

    const cameraRef = useRef<any>(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [showCamera, setShowCamera] = useState(false);
    const [photo, setPhoto] = useState<any>(null);

    const takePhoto = async () => {
        if (!cameraRef.current) return;
    
        const picture = await cameraRef.current.takePictureAsync();
    
        setPhoto(picture);
        setPhotoUploaded(true);
        setShowCamera(false);
    };
    
    return (
        <Screen
              theme={theme}
              scroll
              contentContainerStyle={[ styles.screenContent,
                isWide && styles.screenContentWide,
              ]}
        >
            <View style={styles.content}>
                <View style={styles.upload}>
                    <Image 
                        source={require('../assets/images/lens.png')}
                        style={[styles.icon]}
                        resizeMode = "contain"
                    />
                    <View style={{justifyContent: 'center', flex: 1}}>
                        <Text style={[styles.titleText, {fontSize: isCompact ? Typography.typography.size.subtitle : Typography.typography.size.title}]}>Upload a Picture</Text>
                        <Text style={styles.subtitleText}>
                            {"Scan your skin and see what's going on!"}
                        </Text>
                    </View>
                </View>

                {photoUploaded ? (
                    <View></View>

                ):(
                    <View style={{flexDirection: "row", justifyContent: "center", margin: 10}}>
                        <View style={[styles.imageAdd, Shadows.shadows.card, {width: Math.min(width * .87, 440), height: height * .45, justifyContent: "center", alignItems: "center"}]}>
                            <Image 
                                source={require('../assets/images/image-add.png')}
                                style={{width: "44%", height: "50%"}}
                                resizeMode = "contain"
                            />
                            <View style={{margin: 10, alignItems:'center'}}>
                                <Text style={[styles.boldSubtitleText]}>No Photos Uploaded Yet</Text>
                                <Text style={[styles.subtitleText]}>Add up to 5 photos of the affected area</Text>
                            </View>
                        </View>
                    </View>
                )}

                <View>
                    <SecondaryButton 
                        colors={Gradients.gradients.primary} 
                        style={{marginTop: Spacing.spacing.xxl, marginBottom: Spacing.spacing.xs}} 
                        label="Take Photo" 
                        theme={theme} 
                        onPress={async () => {
                            if (!permission?.granted) {
                                await requestPermission();
                            }
                            setShowCamera(true);
                        }}/>
                    <SecondaryButton colors={Gradients.gradients.coral} style={{marginTop: Spacing.spacing.xs}} label="Choose From Library" theme={theme} onPress={() => router.push('/somewhere')} />
                </View>

                {photoUploaded && (
                    <PrimaryButton label="Analyze Photos" theme={theme} onPress={() => router.push('/somewhere')} />
                )}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({

    screenContent: {
        flexGrow: 1
    },

    screenContentWide: {
        paddingVertical: spacing.lg,
    },

    content: {
        width: '100%',
        maxWidth: 460,
        alignSelf: 'center',
      },

    icon: {
        height: Sizes.sizes.iconLg,
        width: Sizes.sizes.iconLg,
    },

    upload: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 5
    },

    titleText: {
        fontFamily: Typography.typography.fontFamily.regular,
    },

    subtitleText: {
        color: '#959595', 
        fontSize: Typography.typography.size.caption,
        fontFamily: Typography.typography.fontFamily.regular,
    },

    boldSubtitleText: {
        color: '#959595', 
        fontSize: Typography.typography.size.label,
        fontFamily: Typography.typography.fontFamily.bold,
        fontWeight: 'bold',
        lineHeight: Typography.typography.lineHeight.label,
    },

    imageAdd: {
        backgroundColor: Colors.palette.slate160,
        borderRadius: Radius.radius.lg,
    },

})