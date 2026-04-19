import { Text, View, StyleSheet, TextInput, Pressable, Image, useWindowDimensions, Platform, Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from 'react';
import {router} from "expo-router"
import { SecondaryButton } from '@/src/components/ui/SecondaryButton';
import { Screen } from '@/src/components/ui/Screen';
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
import {useCameraPermissions } from "expo-camera";
import PhotoList from "@/src/components/ui/PhotoList";
import PhotoPreviewModal from "@/src/components/ui/PhotoPreview";
import CameraCapture from "@/src/components/ui/CameraCapture";

export default function UploadPicture() {
    const { width, height } = useWindowDimensions();
    const [photoUploaded, setPhotoUploaded] = useState(false);
    const theme = useAppTheme('light');

    const isCompact = width < 350;
    const isWide = width >= 900;

    const [permission, requestPermission] = useCameraPermissions();
    const [showCamera, setShowCamera] = useState(false);
    const [photos, setPhotos] = useState<any[]>([]);
    const [photo, setPhoto] = useState<any>(null);
    const [showPreview, setShowPreview] = useState(false);

    if (showCamera) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <CameraCapture
                    onCapture={(picture) => {
                        setPhotos(prev => [...prev, picture]);
                        setPhotoUploaded(true);
                        setShowCamera(false);
                    }}
                    onClose={() => setShowCamera(false)}
                />
            </SafeAreaView>
        );
    }
    
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
                        <Text style={[styles.titleText, {fontSize: isCompact ? Typography.typography.size.subtitle : Typography.typography.size.title}]}>
                            Upload a Picture
                        </Text>
                        <Text style={styles.subtitleText}>
                            {"Scan your skin and see what's going on!"}
                        </Text>
                    </View>
                </View>

                {photos.length > 0 ? (
                    <View style={[
                        styles.imageAdd, 
                        Shadows.shadows.card, 
                        {width: Math.min(width * .87, 440), 
                        flex: 1, 
                        minHeight: height * .45,
                        alignItems: "center", 
                        margin: Spacing.spacing.sm
                        }]}
                    >
                        <PhotoList
                            photos={photos}
                            onSelect={(p) => {
                                setPhoto(p);
                                setShowPreview(true);
                            }}
                            onDelete={(index) =>
                                setPhotos(prev => prev.filter((_, i) => i !== index))
                            }
                        />
                    </View>
                ) : (
                    <View style={[
                        styles.imageAdd, 
                        Shadows.shadows.card, 
                        {width: Math.min(width * .87, 440), 
                        height: height * .45, 
                        justifyContent: "center", 
                        alignItems: "center", 
                        margin: 10}
                    ]}
                    >
                        <Image 
                            source={require('../assets/images/image-add.png')}
                            style={{width: "44%", height: "50%"}}
                            resizeMode = "contain"
                        />
                        <View style={{margin: Spacing.spacing.sm, alignItems:'center'}}>
                            <Text style={[styles.boldSubtitleText]}>No Photos Uploaded Yet</Text>
                            <Text style={[styles.subtitleText]}>Add up to 5 photos of the affected area</Text>
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
                        }}
                    />
                    <SecondaryButton 
                        colors={Gradients.gradients.coral} 
                        style={{marginVertical: Spacing.spacing.xs}} 
                        label="Choose From Library" 
                        theme={theme} 
                        onPress={() => router.push('/somewhere')} 
                    />
                </View>

                {photos.length > 0 && (
                    <SecondaryButton colors={Gradients.gradients.green} 
                        style={{marginVertical: Spacing.spacing.xs}} 
                        label="Analyze Photos" 
                        theme={theme} 
                        onPress={() => router.push('/somewhere')}
                    />
                )}
            </View>

            <PhotoPreviewModal
                visible={showPreview}
                photo={photo}
                onClose={() => { 
                    setPhoto(null);
                    setShowPreview(false)
                }}
            />
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