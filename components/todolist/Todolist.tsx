import React, {useEffect, useState} from 'react';
import HideKeyboard from "../../utils/hideKeyboard";
import TaskItem from "../task/Task";
import {Task} from "../../common/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Alert,
    Button,
    FlatList,
    StyleSheet,
    ImageBackground,
    Text,
    TextInput,
    View, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, VirtualizedList, Keyboard,
} from 'react-native';
import {v4 as uuidv4} from 'uuid';
// import 'react-native-get-random-values'
import {globalStyles} from "../../common/globalStyles";
import Header from "../header/header";

const Todolist = () => {

    const [value, setValue] = useState<string>('')
    const [show, setShow] = useState<string>('')
    const [tasks, setTasks] = useState<Task[]>([
        {id: Math.random().toString(), title: 'Молоко', isDone: false},
    ])

    const saveTasksToStorage = async (tasks: Task[]) => {
        try {
            const tasksJSON = JSON.stringify(tasks);
            await AsyncStorage.setItem('tasks', tasksJSON);
        } catch (error) {
            console.error('Error saving tasks to AsyncStorage:', error);
        }
    };

    const addTask = async () => {
        if (value.trim() === '') {
            Alert.alert('Введите название продукта');
            return;
        }
        const newTask = {id: Math.random().toString(), title: value, isDone: false};
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        setValue('')
        await saveTasksToStorage(updatedTasks);
    };

    const changeStatus = (taskId: string, status: boolean) => {
        setTasks(tasks.map((task) => task.id === taskId ? {...task, isDone: status} : task))
    }
    const changeTitle = (taskId: string, title: string) => {
        setTasks(tasks.map((task) => task.id === taskId ? {...task, title} : task))
    }

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
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
        (async () => {
            await loadTasksFromStorage();
        })();
    }, []);

    const clearTasksFromStorage = async () => {
        try {
            await AsyncStorage.removeItem('tasks');
            console.log('Tasks cleared from AsyncStorage');
        } catch (error) {
            console.error('Error clearing tasks from AsyncStorage:', error);
        }
    };

    const clearTasks = async () => {
        setTasks([]);
        await clearTasksFromStorage();
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
         // <SafeAreaView style={{flex: 1}}>
            <ImageBackground
                source={require('../../assets/potato.jpg')}
                resizeMode={'cover'}
                style={styles.container}
                blurRadius={1}

            >
                {/*<Header/>*/}
                {/*<View style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 40}}>*/}
                {/*    <Text style={{*/}
                {/*        color: '#eebbc3',*/}
                {/*        elevation: 5,*/}
                {/*        fontSize: 30,*/}
                {/*        fontWeight: 'bold',*/}
                {/*        backgroundColor: 'rgba(7,24,31,0.44)',*/}
                {/*        borderRadius: 5*/}
                {/*    }}>{'Список покупок'}</Text>*/}
                {/*</View>*/}

                <HideKeyboard>
                    <TextInput style={styles.input} value={value} onChangeText={setValue}
                               placeholder={'Введите текст'} maxLength={19}/>
                </HideKeyboard>

                <View style={styles.addProduct}>
                    <Button color={'#590c85'} title={'Очистить'} onPress={clearTasks}/>
                    <Button color={'#6246ea'} title={'Добавить продукт'} onPress={addTask}/>
                </View>
                {/*<KeyboardAvoidingView*/}
                {/*    style={{ flex: 1, justifyContent: 'center' }}*/}
                {/*    enabled*/}
                {/*    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}*/}
                {/*    // keyboardVerticalOffset={Platform.OS === 'ios'? 200: 50}*/}
                {/*>*/}

                <KeyboardAvoidingView
                    style={[styles.contentContainer, globalStyles.border]}
                    // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    // keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 50}
                    behavior={'padding'}

                >

                    <FlatList data={tasks} renderItem={renderTask} keyExtractor={item => `${item.id}`}
                              showsVerticalScrollIndicator={false} />
                </KeyboardAvoidingView>

                {/*</KeyboardAvoidingView>*/}

            </ImageBackground>

         // </SafeAreaView>

    );
}

export default Todolist;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addProduct: {
        marginBottom: 10,
        marginTop: 10,
        borderColor: '#ff8906',
        elevation: 5,
        shadowColor: '#ff8906',
        flexDirection: 'row',
        gap: 60,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        maxHeight: 600,
        //paddingTop:10
        flex: 1
    },
    input: {
        width: '90%',
        backgroundColor: '#fff',
        fontSize: 18,
        padding: 8,
    },
});
