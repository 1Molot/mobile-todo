import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from "react-native";
import {globalStyles} from "../utils/globalStyles";


type InputProps = {
    id: number;
    title: string;
    changeValue: (taskId: number, title: string) => void;
    setShow: (taskId: number) => void;
}

const Input = ({title, id, changeValue, setShow}: InputProps) => {

    const [value, setValue] = useState<string>(title);

    const changeTitle = (title: string) => {
        setValue(title);
    }
    return (
        <View style={{flexDirection: 'row'}}>
            <TextInput style={[styles.input, globalStyles.border]} value={value}
                       onChangeText={(title) => changeTitle(title)}
            />
            <Button title={'+'} onPress={() => {
                changeValue(id, value)
                setShow(0)
            }}/>
        </View>
    );
};


const styles = StyleSheet.create({
    input: {
        width: '80%',
        backgroundColor: '#fff',
        fontSize: 18,
        padding: 4,
        //marginBottom:15
    },
})

export {Input};
