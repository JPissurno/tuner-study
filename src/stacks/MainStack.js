import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import TunerView from '../screens/TunerView/Index';
import SubTunerView from '../screens/SubTunerView/Index';
import MetronomeView from '../screens/MetronomeView/Index';

const Stack = createStackNavigator();

export default () => {

    return(
        <Stack.Navigator>

            <Stack.Screen name="TunerView" component={TunerView} />
            <Stack.Screen name="SubTunerView" component={SubTunerView} />
            <Stack.Screen name="MetronomeView" component={MetronomeView} />

        </Stack.Navigator>
    )

}