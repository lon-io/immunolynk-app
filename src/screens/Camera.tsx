import React, { useState, useEffect, FC } from 'react';
import { Text, View, Alert, Image } from 'react-native';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import { Button } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { uploadUserData, } from '../lib/apiService';
import { getImageFormData } from '../lib/imageFormData';
import Colors from '../constants/Colors';
import Loader from '../components/Loader';
import { resetToHome } from '../lib/navigation';

const CameraScreen: FC<{
    navigation: NavigationProp<any>
}> = ({ navigation }) => {
    let barcodeData: {
        type: string,
        data: string,
    } | null;
    let cameraRef: Camera | null;
    const [barcodeScanned, setBarcodeScanned] = useState(false);
    const [loading, setLoading] = useState(false);
    const [picture, setPicture] = useState<CameraCapturedPicture | null>(null);
    const [uploaded, setUploaded] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [hasBarcodePermission, setHasBarcodePermission] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status: barcodPermStatus } = await BarCodeScanner.requestPermissionsAsync();
            setHasBarcodePermission(barcodPermStatus === 'granted');

            const { status: cameraPermStatus } = await Camera.requestPermissionsAsync();
            setHasCameraPermission(cameraPermStatus === 'granted');
        })();
    }, []);

    const submitData = async () => {
        try {
            setLoading(true);
            await uploadUserData(getImageFormData(picture as CameraCapturedPicture), true);
            setLoading(false);

            resetToHome(navigation, {
                uploaded: true,
            });
        } catch (error) {
            Alert.alert('Error submitting data!');
            setLoading(false);
        }

    }

    // @ts-ignore
    const handleBarCodeScanned = ({ type, data }) => {
        if (cameraRef) {
            setBarcodeScanned(true);

            barcodeData = {
                type,
                data,
            }
            takePicture();
        }
    };

    const takePicture = async () => {
        if (cameraRef && !picture) {
            const picture = await cameraRef.takePictureAsync();

            setPicture(picture);
        }
    }

    const handleRetake = async () => {
        setBarcodeScanned(false);
        setPicture(null);
    }

    if (hasCameraPermission === null && hasBarcodePermission === null) {
        return <View />;
    }

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    if (hasBarcodePermission === false) {
        return <Text>No access to barcode</Text>;
    }

    const pictureTaken = !!picture;
    const canUpload = barcodeScanned && pictureTaken;

    return (
        <View style={{ flex: 1 }}>
            {
                canUpload ?
                    <View
                        style={{
                            backgroundColor: '#fff',
                            flex: 1,
                            justifyContent: 'flex-end',
                            padding: 20,
                        }}
                    >
                        {
                            pictureTaken &&
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    // resizeMode: 'contain',
                                    maxHeight: '70%',
                                    marginBottom: 20,
                                }}
                                source={{
                                    uri: picture?.uri || ''
                                }}
                            />
                        }
                        {
                            !uploaded &&
                            <Button
                                style={{
                                    width: '100%',
                                    height: 52,
                                    justifyContent: 'center',
                                    backgroundColor: Colors.darkGrey,
                                    marginBottom: 20,
                                }}
                                disabled={loading}
                                mode="contained" onPress={() => submitData()}>
                                {
                                    loading
                                        ? <Loader />
                                        : "SUBMIT"
                                }
                            </Button>
                        }
                        {
                            <Button
                                style={{
                                    width: '100%',
                                    height: 52,
                                    justifyContent: 'center',
                                    backgroundColor: 'transparent',
                                    // color: Colors.darkGrey,
                                }}
                                disabled={loading}
                                mode="contained" onPress={() => handleRetake()}>
                                <Text style={{ color: Colors.darkGrey }}>RETAKE</Text>
                        </Button>
                        }
                    </View>
                    :
                    <Camera
                        ref={ref => {
                            cameraRef = ref;
                        }}
                        style={{ flex: 1 }}
                        type={type}
                        // @ts-ignore
                        onBarCodeScanned={barcodeScanned ? undefined : handleBarCodeScanned}
                    >
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 50,
                                left: 20,
                                right: 20,
                                backgroundColor: 'transparent',
                                flexDirection: 'column',
                            }}>
                        </View>
                    </Camera>
            }
        </View>
    );
}

export default CameraScreen;
