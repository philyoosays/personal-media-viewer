import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import { Video } from 'expo';

import ImageViewer from './ImageViewer';

export default class ShowAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toRender: [],
      gifToJpg: 2,
      current: '',
      server: 'http://192.168.1.4:6002',
      slideInterval: '',
    }
  }

  componentDidMount() {
    // let interval = setInterval(() => {
    //   this.cycle()
    // }, 5000)
    // this.setState({
    //   slideInterval: interval
    // })
  }

  async componentDidUpdate(prevProps, prevState) {
    if(this.props.hash !== undefined && this.props.hash !== prevProps.hash) {
      let includeList = this.props.toInclude.map(d => d.slice(1));
      if(this.props.hash) {
        let mediaList = Object.keys(this.props.hash);
        // mediaList = await this.randomizer(mediaList)
        await this.setState({
          toRender: mediaList
        })
        this.cycle()
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.slideInterval);
  }

  cycle() {
    let media = this.state.toRender.slice();
    let current = media.shift();
    media.push(current);
    this.setState({
      toRender: media,
      current: current
    })
  }

  handleClick(e) {
    console.log(e)
  }

  howManyTimes() {
    const gifCounter = this.props.gifCounter
    const jpgCounter = this.props.jpgCounter
    if(gifCounter < jpgCounter) {
      return Math.ceil(jpgCounter / gifCounter)
    }
  }

  setRatio(array, multiples) {
    for(let i = 0; i < array.length; i++) {
      if(array[i].slice(0, 3) === 'gif') {
        for(let x = 1; x < multiples; x++) {
          let copy = array[i]
          array.push(copy);
        }
      }
    }
    return array;
  }

  randomizer(obj) {
    let media = obj.slice();
    for(let i = 0; i < media.length; i++) {
      let rand = Math.floor(Math.random() * media.length);
      while(rand === i) {
        rand = Math.floor(Math.random() * media.length);
      }
      console.log("rand", rand)
      let temp = media[i];
      media[i] = media[rand];
      media[rand] = temp;
    }
    return media;
  }

  // toShow() {
  //   let uri;
  //     console.log(this.state.current.slice(0,3) === 'jpg')
  //   switch(this.state.current) {
  //     case this.state.current.slice(0, 3) === 'jpg':
  //       uri = this.stateserver + this.props.currentDir + this.props.hash[this.state.current];
  //       return <Image source={{uri}} style={{borderWidth: 2}}/>
  //       break;
  //     default:
  //       break;
  //   }
  // }

  render() {

    // const toRender = this.toShow()

    let uri;
    let toRender = undefined;
    if(this.state.current !== '') {
      uri = this.state.server + '/' + this.props.currentDir + '/' + this.props.hash[this.state.current];
      switch(this.state.current.slice(0, 3)) {
        case 'png':
        case 'jpg':
          toRender = <ImageViewer
                        styles={ styles }
                        handleClick={ this.handleClick }
                        uri={ uri }
                      />
          setTimeout(() => {
            this.cycle();
          }, 3000)
          break;
        case 'gif':
          toRender = <ImageViewer
                        styles={ styles }
                        handleClick={ this.handleClick }
                        uri={ uri }
                      />
          setTimeout(() => {
            this.cycle()
          }, 12000)
          break;
        case 'mp4':
          toRender = <Video
                        source={{ uri: uri }}
                        resizeMode="contain"
                        shouldPlay
                        isLooping
                        style={ styles.image }
                      />
          setTimeout(() => {
            this.cycle()
          }, 12000)
          break;
        default:
          break;
      }
    }


    return(
      <View style={ styles.display }>
        <Text>{ this.state.current.split('.')[this.state.current.split('.').length - 1] }</Text>
        {toRender}
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

let targetWidth = width * .95;

const styles = StyleSheet.create({
  display: {
    width: width,
    height: '85%',
    position: 'relative',
    top: 60
  },
  image: {
    height: '100%'
  }
})
