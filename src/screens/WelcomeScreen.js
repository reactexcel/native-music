import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
var {height, width} = Dimensions.get('window');

export default class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header:null,
  };

  checkArtist = () => {
    AsyncStorage.getItem('user').then(user => {
      if(user=== null || user === ''){
        this.props.navigation.navigate('Profile')
      } else {
        // navigate to artist screen
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.header}>
            Welcome To MuZa
          </Text>
            <TouchableOpacity onPress={this.checkArtist}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Icon
                    style={styles.addIcon}
                    name="user-plus"
                  />
                </View> 
              </View>
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.infoText}>
                “Tap the button to connect to the artist and access music”
              </Text>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  avatar:{
    borderWidth:1,
    borderColor:'#b2bec3',
    justifyContent:'center',
    alignContent:'center',
    height:height * 0.21,
    width:width * 0.375,
    borderRadius:100,
    backgroundColor:'#dfe6e9'
  },
  subContainer:{
    flex:1,
    justifyContent:'space-evenly'
  },
  header:{
    fontSize:35,
    fontWeight:'700',
    textAlign:'center',
  },
  addIcon:{
    textAlign:'center',
    fontSize:36
  },
  avatarContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  infoText:{
    fontSize:32,
    fontWeight:'700',
    textAlign:'center'
  },
  textContainer:{
    flexDirection:'row',
    paddingLeft:20,
    paddingRight:20,
    justifyContent:'center',
    alignContent:'center',
    borderWidth:1,
    borderColor:'white'
  }
});
