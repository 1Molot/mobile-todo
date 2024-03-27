import {
    Alert,
    Button,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableNativeFeedback,
    View
} from 'react-native';
import React, {useState} from "react";
import Checkbox from "expo-checkbox";
import {Input} from "./components/input/Input";
import {globalStyles} from "./utils/globalStyles";
import {HideKeyboard} from "./utils/hideKeyboard";


type Task = {
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

    const render = ({item}: { item: Task }) => {
        return (
            <View style={[globalStyles.border, styles.boxTask]}>
                <Checkbox value={item.isDone} onValueChange={(value) => changeStatus(item.id, value)
                } color={'#ff8906'}/>
                {show === item.id ? (
                    <Input id={item.id} title={item.title} changeValue={changeTitle} setShow={setShow}/>
                ) : (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>

                        <Text style={{color: '#fff'}} onPress={() => {
                            setShow(item.id)
                        }}>{item.title}</Text>

                        <TouchableNativeFeedback onPress={() => deleteTask(item.id)}>
                            <View style={{
                                backgroundColor: '#ff8906',
                                padding: 5,
                                borderRadius: 5,
                                marginLeft: 15
                            }}>
                                <Text style={{color: '#fff'}}>Delete</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                )}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerTitle}>
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

            <ScrollView style={styles.contentContainer}>


                <FlatList data={tasks} renderItem={render} keyExtractor={item => `${item.id}`}/>

            </ScrollView>
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
    headerTitle: {},
    addProduct: {marginBottom: 10, borderColor: '#ff8906', elevation: 5, shadowColor: '#ff8906',},
    contentContainer: {
        paddingHorizontal: 40
        //flex: 1,
    },
    input: {
        width: '80%',
        backgroundColor: '#fff',
        fontSize: 18,
        padding: 4,
    },
    boxTask: {
        width: '100%',
        flexDirection: 'row',
        borderColor: 'green',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 20,
        marginVertical: 3
    },
});





