import React from "react";
import Todolist from "./components/todolist/Todolist";
import Header from "./components/header/header";
import {SafeAreaView, StyleSheet, View} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function App() {

    return (
        // <KeyboardAwareScrollView style={{ flex: 1 }}>
        <>
            <Header />
            <SafeAreaView style={styles.containerR}>

                <Todolist />
            </SafeAreaView>
        </>

        // </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    containerR: {
        flex: 1,
        // Другие стили для контейнера...
    },
});





