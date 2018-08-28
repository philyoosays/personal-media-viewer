import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Video } from 'expo';

export default class ShowAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toRender: [],
      gifToJpg: 2,
      current: '',
      server: 'http://192.168.1.4:6002/'
    }
  }

  componentDidMount() {

  }

  async componentDidUpdate(prevProps, prevState) {
    if(this.props.hash !== undefined && this.props.hash !== prevProps.hash) {
      let includeList = this.props.toInclude.map(d => d.slice(1));
      if(this.props.jpgCounter) {
        let mediaList = Object.keys(this.props.hash);
        this.randomizer(mediaList)
        await this.setState({
          toRender: mediaList
        })
        this.cycle()
      }
    }
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
    let media = this.state.toRender.slice();
    for(let i = 0; i < media.length; i++) {
      let rand = 0;
      while(rand === i) {
        rand = Math.floor(Math.random() * media.length);
      }
      let temp = media[i];
      media[i] = media[rand];
      media[rand] = temp;
    }
  }

  toShow() {
    let uri;
      console.log(this.state.current.slice(0,3) === 'jpg')
    switch(this.state.current) {
      case this.state.current.slice(0, 3) === 'jpg':
        uri = this.stateserver + this.props.currentDir + this.props.hash[this.state.current];
        return <Image source={{uri}} style={{borderWidth: 2}}/>
        break;
      default:
        break;
    }
  }

  render() {

    const toRender = this.toShow()
    console.log(toRender)

    return(
      <View style={ styles.display }>
        { toRender }
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

let targetWidth = width * (2/3);

const styles = StyleSheet.create({
  display: {
    width: targetWidth,
    height: 'auto',
    borderWidth: 2,
    borderColor: 'white'
  }
})
