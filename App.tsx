import {Alert, Button, Keyboard, StyleSheet, Text, TextInput, TouchableNativeFeedback, View} from 'react-native';
import React, {ReactElement, ReactNode, useState} from "react";
import Checkbox from "expo-checkbox";


type TodoState = {
    id: number,
    title: string,
    isDone: boolean
}

export default function App() {

    const [value, setValue] = useState('')

    const [tasks, setTasks] = useState<TodoState[]>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS', isDone: true},
        {id: 4, title: 'React', isDone: true},
        {id: 5, title: 'React native', isDone: false},
        {id: 6, title: 'Vue', isDone: false}
    ])

    const addTask = () => {
        const newTask = {id: tasks.length + 1, title: value, isDone: false};
        setTasks([...tasks, newTask]);
        setValue('')
    };


//Alert.alert(JSON.stringify(newTask))
    return (
        <View style={styles.container}>
            <HideKeyboard>
                <View style={[{width: '80%', alignItems: 'center', paddingVertical: 20}]}>
                    <TextInput style={styles.input} value={value} onChangeText={setValue}/>
                </View>
            </HideKeyboard>
            <View style={[globalStyles.border, {backgroundColor: '#ff8906'}]}>
                <Button color={'#0f0e17'} title={'Add task'} onPress={addTask}/>
            </View>

            <View style={{width: '60%'}}>
                {tasks.map((task) => {
                    return <View key={task.id} style={[globalStyles.border, styles.boxTask]}>
                        <Checkbox value={task.isDone} onValueChange={() => {
                        }} color={'red'}/>
                        <Text style={{color: '#fff'}}>{task.title}</Text>
                    </View>
                })}
            </View>

        </View>
    );
}

//утилита для фокуса,вынести отдельно
const HideKeyboard = ({children}: { children: ReactNode }): ReactElement => (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableNativeFeedback>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0e17',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '80%',
        backgroundColor: '#fff',
        fontSize: 18,
        padding: 4,
        //marginBottom:15
    },
    boxTask: {
        flexDirection: 'row',
        //borderColor: '#fffffe',
        borderColor: 'green',
        justifyContent: 'space-between',
        paddingVertical: 4,
        paddingHorizontal: 20,
        marginVertical: 3
    },

});

const globalStyles = StyleSheet.create({
    border: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'red'
    }
});

