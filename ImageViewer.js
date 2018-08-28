import React from 'react';
import { TouchableWithoutFeedback, Image } from 'react-native';

export default function ImageViewer(props) {
  return(
    <TouchableWithoutFeedback style={ props.styles.display } onPress={() => props.handleClick()}>
      <Image
        source={{ uri: props.uri }}
        style={ props.styles.image }
        resizeMode="contain"
      />
    </TouchableWithoutFeedback>
  );
}
