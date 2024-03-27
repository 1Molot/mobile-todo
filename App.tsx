import {Alert, Button, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from "react";
import {HideKeyboard} from "./utils/hideKeyboard";
import TaskItem from "./components/task/Task";


export type Task = {
    id: number,
    title: string,
    isDone: boolean
}

export default function App() {

    const [value, setValue] = useState<string>('')
    const [show, setShow] = useState<number>(0)
    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: 'Молоко', isDone: false},
        {id: 2, title: 'Хлеб', isDone: false},
    ])

    const addTask = () => {
        if (value.trim() === '') {
            Alert.alert('Введите название продукта');
            return;
        }
        const newTask = {id: tasks.length + 1, title: value, isDone: false};
        setTasks([...tasks, newTask]);
        setValue('')
    };

    const changeStatus = (taskId: number, status: boolean) => {
        setTasks(tasks.map((task) => task.id === taskId ? {...task, isDone: status} : task))
    }
    const changeTitle = (taskId: number, title: string) => {
        setTasks(tasks.map((task) => task.id === taskId ? {...task, title} : task))
    }

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const renderTask = ({item}: { item: Task }) => {
        return (
            <TaskItem
                item={item}
                show={show}
                setShow={setShow}
                changeStatus={changeStatus}
                changeTitle={changeTitle}
                deleteTask={deleteTask}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={{color: '#ff8906', elevation: 5, fontSize: 20}}>{'Список продуктов'}</Text>
            </View>
            <HideKeyboard>
                <View style={[{width: '80%', alignItems: 'center', paddingVertical: 20}]}>
                    <TextInput style={styles.input} value={value} onChangeText={setValue}/>
                </View>
            </HideKeyboard>
            <View style={styles.addProduct}>
                <Button color={'#6246ea'} title={'Добавить продукт'} onPress={addTask}/>
            </View>
            <View style={styles.contentContainer}>
                <FlatList data={tasks} renderItem={renderTask} keyExtractor={item => `${item.id}`}/>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 200,
        //backgroundColor: '#0f0e17',
        backgroundColor: '#135e5e',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',

    },
    addProduct: {
        marginBottom: 10,
        borderColor: '#ff8906',
        elevation: 5,
        shadowColor: '#ff8906',
    },
    contentContainer: {
        paddingHorizontal: 40,
        flex: 1,
        paddingBottom: 10
    },
    input: {
        width: '80%',
        backgroundColor: '#fff',
        fontSize: 18,
        padding: 4,
    },
});





