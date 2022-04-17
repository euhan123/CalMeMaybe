import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';

//import { Auth } from "aws-amplify";

import LandingScreen from './screens/Landing.js'; 
import HomeScreen from './screens/Home.js';
import LoginScreen from './screens/Login.js';
import SignUpScreen from './screens/SignUp.js';
import ConfirmScreen from './screens/Confirm.js';
import MapScreen from './screens/Map.js'


const RootStack = createStackNavigator();



const App = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(true);

    // const handleSignUp = ({ navigation }) => {
    //     navigation.navigate(ConfirmScreen);
    // }


    return ( 
    <NavigationContainer> 
        <RootStack.Navigator>
            {isAuthenticated ? (
                <RootStack.Screen name="Map" component={MapScreen} />
            ) : (
                <>
                <RootStack.Screen name="Cal Me Maybe" component={LandingScreen} />
                <RootStack.Screen name = "Sign In"> 
                    {(props) => (
                        <LoginScreen {...props} LogIn = {setIsAuthenticated} />
                    )}
                </RootStack.Screen>
                <RootStack.Screen name = "Sign Up"> 
                    {(props) => (
                        <SignUpScreen {...props} LogIn = {setIsAuthenticated} />
                    )}
                </RootStack.Screen>
                <RootStack.Screen name = "Confirm Screen"> 
                    {(props) => (
                        <ConfirmScreen {...props} LogIn = {setIsAuthenticated} />
                    )}
                </RootStack.Screen>
                </>
            )}
        </RootStack.Navigator>
    </NavigationContainer>
    );
};
export default App;