import React from 'react';
import { StyleSheet, View } from 'react-native';

import CustomButton from './CustomButton';

export default function NavBar(props) {
  return(
    <View style={ styles.navContainer }>
      <CustomButton
        text="ALL"
        textStyle={ styles.navButtonText }
        buttonStyle={ styles.navButton }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: '#111',
    position: 'absolute',
    top: 30,
    alignItems: 'center'
  },
  navButton: {
    width: 100,
    height: 40,
    backgroundColor: '#313131',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    color: 'white',
  },

})
