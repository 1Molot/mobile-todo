import React from 'react';
import {Text, View} from "react-native";

const Header = () => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center', paddingBottom: 40}}>
            <Text style={{
                color: '#eebbc3',
                elevation: 5,
                fontSize: 30,
                fontWeight: 'bold',
                backgroundColor: 'rgba(7,24,31,0.44)',
                borderRadius: 5
            }}>{'Список покупок'}</Text>
        </View>
    );
};

export default Header;
