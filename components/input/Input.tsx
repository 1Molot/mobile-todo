import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View, KeyboardAvoidingView, Platform} from "react-native";
import {globalStyles} from "../../common/globalStyles";
import HideKeyboard from "../../utils/hideKeyboard";


type InputProps = {
    id: string;
    title: string;
    changeValue: (taskId: string, title: string) => void;
    setShow: (taskId: string) => void;
}

const Input = ({title, id, changeValue, setShow}: InputProps) => {

    const [value, setValue] = useState<string>(title);

    const changeTitle = (title: string) => {
        setValue(title);
    }


    return (
        <View style={{flex: 1, flexDirection: 'row', gap: 10}}>
            <HideKeyboard>
            <TextInput style={[styles.input, globalStyles.border, {elevation: 5}]} value={value}
                       onChangeText={(title) => changeTitle(title)} autoFocus maxLength={19}
            />
            </HideKeyboard>
            <View style={{width: 50}}>
                <Button title={'+'} onPress={() => {
                    changeValue(id, value)
                    setShow('')
                }}/>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    input: {
        width: '75%',
        backgroundColor: '#fff',
        fontSize: 15,
        padding: 4,
    },
})

export {Input};
