import { View, Text, TouchableWithoutFeedback, StyleSheet, Animated, Alert } from 'react-native'
import React from 'react'
import { createStackNavigator } from 'react-navigation';
import * as Animatable from "react-native-animatable";
import FontAwesome from 'react-native-vector-icons/FontAwesome'; //exporting through vector-icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';

class FloatingButtons extends React.Component {
//userid
  animation = new Animated.Value(0);

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;

    Animated.spring(
      this.animation, {
      toValue,
      friction: 5,
      useNativeDriver: 0,
    }
    ).start();

    this.open = !this.open
  };

  render() {
    const Addgroupwithschedular = {

      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -80],

          })
        }
      ]
    };

    const Addgroupwithoutschedular = {

      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -160]
          })
        }

      ]

    };

    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg']
          })
        }
      ]
    };

    //opacity
    const opacity = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1]
    })

    return (
      <View style={[styles.container, this.props.style]}>

        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.secondary]}    >
            <AntDesign name="pluscircleo" size={25} color="black"
              onPress={() => {
                Alert.alert('Hello');
              }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate('creategroup')}
        >
          <Animated.View style={[styles.button, styles.secondary, Addgroupwithschedular, opacity]}
          >
            <AntDesign name="addusergroup" size={30} color="#fff"

            />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate('QuickTalks')}
        >
          <Animated.View style={[styles.button, styles.secondary, Addgroupwithoutschedular, opacity]}>
            <Feather name="phone" size={30} color="#fff" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <Animated.View style={[styles.button, styles.menus, rotation]}>
            <AntDesign name="plus" size={30} color="#fff" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
};

export default FloatingButtons;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute"

  },
  button: {
    position: "absolute",
    width: 50,
    height: 50,
    bottom: -40,
    left: 300,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "#F02A4B",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 }
  },
  menus: {
    backgroundColor: '#192a53'
  },
  secondary: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#192a53'

  }
});