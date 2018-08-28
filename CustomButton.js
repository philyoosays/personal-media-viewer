import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function CustomButton(props) {
  return(
    <TouchableOpacity style={ props.buttonStyle } onPress={ () => props.clickAction(props.text.toLowerCase()) }>
      <Text style={ props.textStyle }>{ props.text }</Text>
    </TouchableOpacity>
  );
}
