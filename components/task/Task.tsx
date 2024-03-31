import React from 'react';
import {View, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import Checkbox from 'expo-checkbox';
import {globalStyles} from "../../common/globalStyles";
import {Input} from "../input/Input";
import {Task} from "../../common/types";
import Line from "../../common/line";


type TaskItem = {
    item: Task;
    show: number;
    setShow: (taskId: number) => void;
    changeStatus: (taskId: number, status: boolean) => void;
    changeTitle: (taskId: number, title: string) => void;
    deleteTask: (taskId: number) => void;
}

const TaskItem = ({item, show, setShow, changeStatus, changeTitle, deleteTask,}: TaskItem) => {
    return (
        <View style={[globalStyles.border, styles.boxTask]}>
            <Checkbox value={item.isDone} onValueChange={(value) => changeStatus(item.id, value)} color={'#ff8906'}/>
            {show === item.id ? (
                <Input id={item.id} title={item.title} changeValue={changeTitle} setShow={setShow}/>
            ) : (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{position: 'relative'}}>
                        {item.isDone && <Line/>}
                        <Text style={{color: '#fff'}} onPress={() => setShow(item.id)}>
                            {item.title}
                        </Text>
                    </View>

                    <TouchableNativeFeedback onPress={() => deleteTask(item.id)}>
                        <View
                            style={{
                                backgroundColor: '#ff8906',
                                padding: 5,
                                borderRadius: 5,
                                marginLeft: 15,
                            }}
                        >
                            <Text style={{color: '#fff'}}>Delete</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    boxTask: {
        width: '100%',
        flexDirection: 'row',
        borderColor: 'green',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 20,
        marginVertical: 3,
    },
    strikethrough:{
        textDecorationLine : 'line-through',
    }
});

export default TaskItem;
