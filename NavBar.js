import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import CustomButton from './CustomButton';

export default function NavBar(props) {

  function handleClick(selection) {
    console.log('nav click')
    props.setTheState('toRender', 'showall', 'currentDir', selection);
  }

  const toRender = <FlatList
                      data={ props.navOptions }
                      horizontal={ true }
                      renderItem={({item}) => (
                        <CustomButton
                          text={ item.toUpperCase() }
                          textStyle={ styles.navButtonText }
                          buttonStyle={ styles.navButton }
                          clickAction={ handleClick }
                          key={ item }
                        />
                      )}
                    />

  return(
    <View style={ styles.navContainer }>
      { toRender }
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
    marginLeft: 10
  },
  navButtonText: {
    color: 'white',
  },

})
