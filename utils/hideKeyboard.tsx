// import {ReactElement, ReactNode} from "react";
// import {Keyboard, TouchableNativeFeedback} from "react-native";
//
// //утилита для фокуса
// export const HideKeyboard = ({children}: { children: ReactNode }): ReactElement => (
//     <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
// {children}
// </TouchableNativeFeedback>
// )


//утилита для скрытия клавиатуры при нажатии на любую область экрана, кроме поля ввода текста.
import React, { ReactElement, ReactNode } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

interface HideKeyboardProps {
    children: ReactNode;
}

const HideKeyboard: React.FC<HideKeyboardProps> = ({ children }: HideKeyboardProps): ReactElement => {
    const handlePress = () => {
        Keyboard.dismiss();

    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            {children}
        </TouchableWithoutFeedback>
    );
};

export default HideKeyboard;
