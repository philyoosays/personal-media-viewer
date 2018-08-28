import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import NavBar from './NavBar';
import ShowAll from './ShowAll';
import GoFetch from './GoFetch';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navOptions: [],
      currentDir: '',
      toRender: '',
      files: [],
      filesHash: undefined,
      gifCounter: 0,
      jpgCounter: 0,
      mp4Counter: 0,
      toInclude: ['.gif', '.jpg'],
    }

    this.setTheState = this.setTheState.bind(this);
  }

  componentDidMount() {
    this.getNavOptions()
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.currentDir !== this.state.currentDir) {
      this.getDirFiles();
    }
  }

  async getNavOptions() {
    let options = await GoFetch('GET', '/personal/directory', true);
    console.log('options', options)
    options.push('controls');
    options.push('refresh');
    this.setState({
      navOptions: options
    })
  }

  async getDirFiles() {
    let data = await GoFetch('GET', `/personal/directory/${this.state.currentDir}`, true);
    let files = data.filter(file => {
      return this.state.toInclude.includes(file.slice(-4)) || this.state.toInclude.includes(file.slice(-3));
    })
    let gifCounter = 0;
    let jpgCounter = 0;
    let hash = {};
    files.map(d => {
      let tempArr = d.split('.');
      let ext = tempArr.pop()
      let index = ext === 'gif' ? gifCounter : jpgCounter;
      if(ext === 'gif') {
        gifCounter += 1;
      } else {
        jpgCounter += 1;
      }
      hash[ext + index] = d;
    })
    this.setState({
      files: files,
      filesHash: hash,
      gifCounter: gifCounter,
      jpgCounter: jpgCounter,
    })
  }

  loadRender() {
    switch(this.state.toRender) {
      case 'showall':
        return <ShowAll
                  hash={ this.state.filesHash }
                  currentDir={ this.state.currentDir }
                  gifCounter={ this.state.gifCounter }
                  jpgCounter={ this.state.jpgCounter }
                  toInclude={ this.state.toInclude }
                  setTheState={ this.setTheState }
                />;
        break;
    }
  }

  async setTheState(key, value, keyTwo, valueTwo, keyThree, valueThree, keyFour, valueFour) {
    let newState = {
      [key]: value,
      [keyTwo]: valueTwo,
      [keyThree]: valueThree,
      [keyFour]: valueFour
    }

    let safety = 0;
    while(newState.hasOwnProperty(undefined) && safety < 3) {
      delete newState[undefined]
      safety++;
    }

    if(safety >= 3) {
      console.log('Safety Triggered')
    }

    await this.setState( newState );
  }

  render() {
    const toRender = this.loadRender();

    return (
      <View style={styles.container}>
        <NavBar
          navOptions={ this.state.navOptions }
          setTheState={ this.setTheState }/>
        { toRender }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#313131',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
