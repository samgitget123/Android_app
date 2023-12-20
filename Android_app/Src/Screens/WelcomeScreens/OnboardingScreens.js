import React from "react";
import { StyleSheet, Image } from "react-native";

import Onboarding from "react-native-onboarding-swiper";



const OnboardingScreens = ({ navigation }) => {
    return (
        <Onboarding

            onSkip={() => navigation.replace("SigninScreen")}
            onDone={() => navigation.navigate("SigninScreen")}


            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../../Assets/one.jpg')} style={styles.imagesize} />,
                    title: 'Welcome To Convox Bridge App',
                    subtitle: 'Lets Explore About us',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../../Assets/two.jpg')} style={styles.imagesize} />,
                    title: 'Go Through all about Convox and its Features',
                    subtitle: 'Have a Happy Tour',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../../Assets/one.jpg')} style={styles.imagesize} />,
                    title: 'Hope You will Have a Productive Time here',
                    subtitle: 'Thank You ....Deepijatel',
                },

            ]}
        />
    );

};

export default OnboardingScreens;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagesize: {
        width: 300,
        height: 300
    }
});