import {ReactElement, ReactNode} from "react";
import {Keyboard, TouchableNativeFeedback} from "react-native";

//утилита для фокуса
export const HideKeyboard = ({children}: { children: ReactNode }): ReactElement => (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
{children}
</TouchableNativeFeedback>
)
