import React, {useEffect, useState} from 'react';
import {HideKeyboard} from "../../utils/hideKeyboard";
import TaskItem from "../task/Task";
import {Task} from "../../common/types";
import {
    Alert,
    Button,
    FlatList,
    StyleSheet,
    ImageBackground,
    Text,
    TextInput,
    View,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";



const Todolist = () => {

    const [value, setValue] = useState<string>('')
    const [show, setShow] = useState<number>(0)
    const [tasks, setTasks] = useState<Task[]>([
        {id: 1, title: 'Молоко', isDone: false},
    ])

    const saveTasksToStorage = async (tasks: Task[]) => {
        try {
            const tasksJSON = JSON.stringify(tasks);
            await AsyncStorage.setItem('tasks', tasksJSON);
        } catch (error) {
            console.error('Error saving tasks to AsyncStorage:', error);
        }
    };

    const addTask = () => {
        if (value.trim() === '') {
            Alert.alert('Введите название продукта');
            return;
        }
        const newTask = {id: tasks.length + 1, title: value, isDone: false};
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        setValue('')
        saveTasksToStorage(updatedTasks);
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

    const loadTasksFromStorage = async () => {
        try {
            const tasksJSON = await AsyncStorage.getItem('tasks');
            if (tasksJSON) {
                const tasks = JSON.parse(tasksJSON);
                setTasks(tasks);
            }
        } catch (error) {
            console.error('Error loading tasks from AsyncStorage:', error);
        }
    };

    useEffect(() => {
        loadTasksFromStorage();
    }, []);

    return (

        <ImageBackground
            source={require('../../assets/potato.jpg')}
            resizeMode={'cover'}
            style={styles.container}
            blurRadius={1}
        >
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: '#f35306', elevation: 5, fontSize: 20}}>{'Список продуктов'}</Text>
            </View>
           <HideKeyboard>
                <View style={[{width: '80%', alignItems: 'center', paddingVertical: 20}]}>
                    <TextInput style={styles.input} value={value} onChangeText={setValue} placeholder={'Введите текст'}/>
                </View>
            </HideKeyboard>
            <View style={styles.addProduct}>
                <Button color={'#6246ea'} title={'Добавить продукт'} onPress={addTask}/>
            </View>
            <View style={styles.contentContainer}>
                <FlatList data={tasks} renderItem={renderTask} keyExtractor={item => `${item.id}`}/>
            </View>
        </ImageBackground>

    );
}

export default Todolist;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 150,
        alignItems: 'center',
        justifyContent: 'center',
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
