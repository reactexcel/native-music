import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MusicControl from 'react-native-music-control';
var {height, width} = Dimensions.get('window');

var song = require('../assets/EminemVenom.mp3')
var artistData = require('../constants/artist.json')
import Video from 'react-native-video';

export default class ArtistScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      play: false,
      pause: false,
      stop: false,
      IsSongLoading:true,
      IsSongStopLoading:false,
      IsSongPlayStart:false,
      IsSongPlaying:false,
      border:1
    }
  }
  componentDidMount() {
    // call api to get artist data from firebase
    MusicControl.enableBackgroundMode(true);

  }

  handlePlay = () => {
    this.setState({
      play: true,
      pause: false,
    })
    MusicControl.enableControl('play', true)
  }

  handlePause = () => {
    this.setState({
      play: false,
      pause: true,
    })
    MusicControl.enableControl('pause', true)
  }
  componentDidUpdate(){
    if(this.state.IsSongPlayStart){
      this.setState({IsSongPlayStart:false,IsSongLoading:false,IsSongStopLoading:true,border:0 })
    }
  }

  render() {
    const { play, pause } = this.state;
    return (
      <ScrollView style={{flex:1}} >
          <View>
            <View style={styles.container}>
              <View style={[styles.ImageContainer ,{borderWidth:this.state.border}]}>
                {this.state.IsSongLoading && <View style={styles.ActivityIndicator}> 
                     <ActivityIndicator size="large" color="#0000ff" />
                  </View>
                }
               {this.state.IsSongStopLoading && <Image
                  style={styles.Image}
                  source={require('../assets/images/sergeinovikov.png')}
                />
               }
              </View>
              <Text style={styles.artistName}>
                {artistData.artistname}
              </Text>
          </View>
          <View style={{flexDirection:'row',flex:1,margin:5}} >
              <View style={{flexDirection:'column',alignItems:'center'}} >
                <Image
                  style={{height:60,width:60,marginTop:5,marginBottom:5}}
                  source={require('../assets/images/simplyintoxicati.jpg')}
                />
              </View>

              <View style={{alignContent:'center',flexDirection:'column',justifyContent:'space-between',width:60}} >
                <View style={{margin:10}} >
                <Video 
                  source={{uri:artistData.source1}} 
                  paused={this.state.play}
                  playInBackground={true}
                  playWhenInactive={true}
                  onProgress={()=> !this.state.IsSongPlaying ? this.setState({IsSongPlayStart:true ,IsSongPlaying:true}) :''}
                  audioOnly
                />
                 
                  { !play ?
                    <TouchableOpacity
                    onPress={this.handlePlay}
                    >
                    <Icon
                      size={45}
                      name="pause-circle"
                    />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                    onPress={this.handlePause}
                    >
                    <Icon
                      size={45}
                      name="play-circle"
                    />
                    </TouchableOpacity>
                  }
                </View>

                <View style={{flexDirection:'row',margin:10}} >
                  <View style={{marginRight:10}} >
                  <Icon
                    size={10}
                    name="backward"
                  />
                  </View>
                  <View style={{marginLeft:10}} >
                  <Icon
                    size={10}
                    name="forward"
                  />
                  </View>
                </View>
              </View>
              
              <View style={{flex:1,flexDirection:'column'}} >
                <View>
                  <Text style={styles.albumDetail} numberOfLines={1} ellipsizeMode={'tail'} > {artistData.artistname} </Text>
                  <Text style={styles.albumDetail} numberOfLines={1} > {artistData.albums[1].songs[0].songname} </Text>
                  <Text style={styles.albumDetail} numberOfLines={1} > {artistData.albums[0].albumname} </Text>
                </View>

              </View>
              
              <View style={{flex:1,justifyContent:'space-between',flexDirection:'column'}} >
                <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between'}} >
                  <View style={{marginTop:5,marginLeft:10}} >
                    <Icon
                      size={10}
                      color="pink"
                      name="share-alt"
                    />
                  </View>
                  <View style={{borderWidth:1,borderColor:'pink',width:85,textAlign:'center'}} >
                    <Text style={{color:'pink',fontSize:12}} > Album $19.99 </Text>
                  </View>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:2,marginRight:2}} >
                  <Text style={{fontSize:11,color:'gray'}} > 00:00/2:38 </Text>
                  <View>
                    <Icon
                      size={11}
                      name="volume-up"
                    />
                  </View>
                  <View>
                    <Icon
                      size={11}
                      name="music"
                    />
                  </View>
                </View>
              </View>
          </View>
        
          <View style={{flex:1}} >
              { artistData.albums[1].songs.map(song =>{
                return(
                  <View key={song.id} style={styles.songItem} >
                   <View style={{flexDirection:'row',margin:5}} >
                    <Text style={{marginRight:5,color:'gray'}} > {song.id} </Text>
                    <Text style={{color:'gray'}} > {song.songname} </Text>
                   </View>
                   <View>
                      <Text style={{color:'gray'}} > 2:38 </Text>                   
                   </View>
                  </View>
                  )
              })
              }
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:28,
    justifyContent:'space-between'
  },
  ImageContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    width:width * 0.51,
    height: height * 0.30,
    alignSelf:'center',
    
  },
  Image:{
    width:width * 0.51,
    height: height * 0.30
    // width:"100%"
  },
  artistName:{
    marginTop:5,
    fontSize:20,
    fontWeight:'800',
    textAlign:'center'
  },
  textContainer:{
    padding:10
  },
  songItem:{
    borderBottomWidth:0.5,
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    marginLeft:5,
    marginRight:5,
    marginTop:10,
    borderColor:'gray'
  },
  albumDetail:{
    fontSize:12,
    marginBottom:2,
    color:'gray'
  },
    ActivityIndicator:{
      position:'absolute',
      justifyContent:'center',
      zIndex:1
    }

});
