import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';

//import { Auth } from "aws-amplify";

import LandingScreen from './screens/Landing.js'; 
import HomeScreen from './screens/Home.js';
import LoginScreen from './screens/Login.js';


const RootStack = createStackNavigator();



const App = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    // const handleSignUp = ({ navigation }) => {
    //     navigation.navigate(ConfirmScreen);
    // }

    return ( 
    <NavigationContainer> 
        <RootStack.Navigator>
            {isAuthenticated ? (
                <RootStack.Screen name="Home" component={HomeScreen} />
            ) : (
                <>
                <RootStack.Screen name="Landing" component={LandingScreen} />
                <RootStack.Screen name = "Sign In"> 
                    {(props) => (
                        <LoginScreen {...props} LogIn = {setIsAuthenticated} />
                    )}
                </RootStack.Screen>
                </>
            )}
        </RootStack.Navigator>
    </NavigationContainer>
    );
};
export default App;