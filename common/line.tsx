import React from 'react';
import {StyleSheet, View} from "react-native";

const Line = () => {

    return (
        <View style={styles.line}>

        </View>
    );
};


const styles = StyleSheet.create({
    line: {
        position:'absolute',
        top: '48%',
        left: 0,
        width: '100%',
        height: 2.5,
        backgroundColor: 'black',
        zIndex:5,
    },
})

export default Line;
