import * as React from 'react';
import 'react-native-gesture-handler';
import { Button } from 'react-native';
import { NavigationContainer, DrawerActions, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


//import { Auth } from "aws-amplify";

import LandingScreen from './screens/Landing.js'; 
import HomeScreen from './screens/Home.js';
import LoginScreen from './screens/Login.js';
import SignUpScreen from './screens/SignUp.js';
import ConfirmScreen from './screens/Confirm.js';
import MapScreen from './screens/Map.js'
import WalkScreen from './screens/Walk.js'
import TimeScreen from './screens/Time.js';
import Friend from './screens/Friends.js';
import Profile from './screens/Profile.js';
import CompletedScreen from './screens/Completed.js';

const RootStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const App = () => {
    
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePass] = React.useState("");

    const fields = {
        Email: email,
        Password: password,
        ChangeEmail: onChangeEmail,
        ChangePass: onChangePass,
    }

    // const handleSignUp = ({ navigation }) => {
    //     navigation.navigate(ConfirmScreen);
    // }

    const handleSignOut = () => {
        //implement actual sign out
        Auth.signOut();
        setIsAuthenticated(false);
    }

    const HomeDrawer = () => {
        return (
            <Drawer.Navigator>
                <Drawer.Screen name = "Home" component = {HomeScreen} options = {{ headerShown: false }} />
                <Drawer.Screen name = "Map" component = {MapScreen} options = {{ headerShown: false }}/>
                <Drawer.Screen name = "Profile" options = {{ headerShown: false }}>
                            {(props) => (
                                <Profile {...props} vars = {fields} />
                            )}
                </Drawer.Screen> 
                <Drawer.Screen name = "Add Friends" component = {Friend} options = {{ headerShown: false }} vars = {fields}/>
            </Drawer.Navigator>
        );
    }; 

    return ( 
    <NavigationContainer> 
        <RootStack.Navigator>
            {isAuthenticated ? (
                <>
                <RootStack.Screen 
                            name = "Home Drawer" 
                            component = {HomeDrawer}
                            options = { ({ route, navigation }) => ({
                                headerTitle: getFocusedRouteNameFromRoute(route),
                                headerLeft: () => (
                                    <Button
                                        onPress = {() =>
                                            navigation.dispatch(DrawerActions.toggleDrawer())
                                        }
                                        title = "Menu"
                                    />
                                ),
                                headerRight: () => (
                                    <Button onPress = {handleSignOut} title = "Sign Out" />
                                ),
                            })}
                />
                <RootStack.Screen name = "Time Screen" component = {TimeScreen} />
                <RootStack.Screen name = "Walk Screen" component = {WalkScreen} />
                <RootStack.Screen name = "Completed Screen" component = {CompletedScreen} />
                </>
            ) : (
                <>
                <RootStack.Screen 
                    name = "Cal Me Maybe" 
                    component = {LandingScreen} 
                    options = {{
                        animationTypeForReplace: 'pop'
                    }}
                />
                <RootStack.Screen name = "Sign In">
                    {(props) => (
                        <LoginScreen {...props} LogIn = { setIsAuthenticated } params = {fields} />
                    )}
                </RootStack.Screen> 
                <RootStack.Screen name = "Sign Up">
                    {(props) => (
                        <SignUpScreen {...props} LogIn = { setIsAuthenticated } params = {fields} />
                    )}
                </RootStack.Screen>
                <RootStack.Screen name = "Confirm Screen">
                    {(props) => (
                        <ConfirmScreen {...props} LogIn = { setIsAuthenticated } />
                    )}
                </RootStack.Screen>
                </>
            )}
        </RootStack.Navigator>
    </NavigationContainer>
    );
};
export default App;