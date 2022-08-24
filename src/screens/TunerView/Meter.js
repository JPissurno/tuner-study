import React, { PureComponent } from "react";
import { View, Animated, StyleSheet } from "react-native";

export default class Meter extends PureComponent {

    state = {
        cents: new Animated.Value(0),
    };

    componentDidUpdate(){

        Animated.timing(this.state.cents, {

            toValue: this.props.cents,
            duration: 500,
            useNativeDriver: true,

        }).start();

    }

    render(){

        const cents = this.state.cents.interpolate({

            inputRange: [-50, 50],
            outputRange: ["-45deg", "45deg"],

        });

        const pointerStyle = {
            transform: [{ rotate: cents }],
        };

        return (
            <View style={style.meter}>

                <Animated.View style={[style.scale, style.strong, style.pointer, pointerStyle]} />

                <View style={style.origin} />
                <View style={[style.scale, {transform: [{ rotate: "-45deg" }]}, style.strong]} />
                <View style={[style.scale, {transform: [{ rotate: "-36deg" }]}]} />
                <View style={[style.scale, {transform: [{ rotate: "-27deg" }]}]} />
                <View style={[style.scale, {transform: [{ rotate: "-18deg" }]}]} />
                <View style={[style.scale, {transform: [{ rotate: "-9deg" }]}]} />
                <View style={[style.scale, style.strong]} />
                <View style={[style.scale, {transform: [{ rotate: "9deg" }]}]} />
                <View style={[style.scale, {transform: [{ rotate: "18deg" }]}]} />
                <View style={[style.scale, {transform: [{ rotate: "27deg" }]}]} />
                <View style={[style.scale, {transform: [{ rotate: "36deg" }]}]} />
                <View style={[style.scale, {transform: [{ rotate: "45deg" }]}, style.strong]} />

            </View>
        );

    }

}

const style = StyleSheet.create({

    meter: {
        height: 200,
        marginBottom: 40,
    },

    origin: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: "#37474f",
    },

    scale: {
        position: "absolute",
        left: 0,
        right: 0,
        width: 1,
        height: 400,
        borderTopWidth: 10,
        borderTopColor: "black",
        marginLeft: 4.5,
    },

    strong: {
        width: 2,
        borderTopWidth: 20,
    },

    pointer: {
        borderTopWidth: 195,
    }

});