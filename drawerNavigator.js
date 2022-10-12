import React, {Component} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigation";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout"
import firebase from "firebase";

import CustomSidebarMenu from "../components/CustomSidebarMenu";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
    constructor(props){
      super(props);
      this.state = {
        light_theme: true
      }
    }
    
    componentDidMount() {
    this.fetchUser();
    }

    fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("users/" + "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")
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
    };

  render(){
  return (
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: "#e91e63",
            inactiveTintColor: this.state.light_theme ? "black" : "white",
            itemStyle: {marginVertical: 5},
          }}    
          drawerContent={(props) => <CustomSidebarMenu{...props}/>}
        >
            <Drawer.Screen name="Tela Inicial" component={StackNavigator} options={{unmountOnBlur: true}} />
            <Drawer.Screen name="Perfil" component={Profile} options={{unmountOnBlur: true}} />
            <Drawer.Screen name="Logout" component={Logout} options={{unmountOnBlur: true}} />
        </Drawer.Navigator>
    ); 
  }
}
