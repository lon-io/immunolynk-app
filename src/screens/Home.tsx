import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { ScreenNames } from '../constants/Layout';
import { Button } from 'react-native-paper';
import Header from '../components/Header';
import CameraIcon from '../components/CameraIcon';
import LogoAlt from '../components/LogoAlt';
import Colors from '../constants/Colors';
import { theme } from '../core/theme';

export interface HomeScreenProps {
    navigation: NavigationProp<any>;
    route: RouteProp<any, any>;
}

export default function HomeScreen({ route, navigation }: HomeScreenProps) {
    // @ts-ignore
    const { params } = route;

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
                flexDirection: 'column',
                paddingTop: 140,
                paddingLeft: 20,
                paddingRight: 20,
            }}>
            {
                params?.uploaded ?
                    <>
                        <View
                        >
                            <Header>Thank you,</Header>
                            <Header>your immunity is verified</Header>
                        </View>
                        <View style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10,
                            marginLeft: 12,
                        }}>
                            <LogoAlt />
                        </View>
                    </>
                    : <>
                        <View
                        >
                            <Header>Hey Lon!</Header>
                            <Header>Welcome To</Header>
                            <Header>Immuno Lynk</Header>
                        </View>
                        <Text style={{
                            fontSize: 17,
                            lineHeight: 25,
                            marginTop: 25,
                            fontFamily: 'Avenir Next'
                        }}>
                            Welcome to Immuno Lynk. To verify your immunity status, select the camera button and snap a photo of the QR code on your testing kit.
                        </Text>
                    </>
            }
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <Button
                    style={{
                        width: 92,
                        height: 92,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        borderRadius: 46,
                        backgroundColor: Colors.darkGrey,
                        alignItems: 'center',
                        marginBottom: 30,
                        paddingTop: 5,
                        paddingRight: 2,
                    }}
                    theme={theme}
                    onPress={() => {
                        navigation.navigate(ScreenNames.CAMERA)
                    }}>
                    <CameraIcon />
                </Button>
            </View>
            {/* <Button
                    style={{
                        width: '80%',
                        height: 150,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        borderRadius: 15,
                        backgroundColor: '#000',
                        alignItems: 'center',
                        marginBottom: 10
                    }}
                    onPress={() => {
                        navigation.navigate(ScreenNames.CAMERA)
                    }}>
                    <Text style={{ fontSize: 18, color: 'white' }}> Validate Immunity </Text>
                </Button>
                <Button
                    style={{
                        width: '80%',
                        height: 150,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        borderRadius: 15,
                        backgroundColor: '#000',
                        alignItems: 'center',
                        marginTop: 10
                    }}
                    onPress={() => {
                        navigation.navigate(ScreenNames.BARCODE)
                    }}>
                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> How does it work? </Text>
                </Button> */}
        </View>
    );
}
