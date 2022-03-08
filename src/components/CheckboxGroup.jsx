import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

export default function CheckboxGroup({ activeValue, setActiveValue, options }) {
  const [checkBoxOptions, setCheckBoxOptions] = useState(options);

  const checkboxHandler = (value, index) => {
    setActiveValue(value);
    const newOptions = checkBoxOptions.map((item, i) => {
      if (index !== i) {
        return {
          ...item,
          checked: false,
        };
      }
      if (index === i) {
        return {
          ...item,
          checked: !item.checked,
        };
      }
      return item;
    });
    setCheckBoxOptions(newOptions);
  };

  const checkboxes = checkBoxOptions.map((item, index) => {
    return (
      <CheckBox
        key={ index }
        checkedIcon={
          <Icon
            name="radio-button-checked"
            type="material"
            color="#fff"
            size={ 24 }
          />
        }
        uncheckedIcon={
          <Icon
            name="radio-button-unchecked"
            type="material"
            color="#fff"
            size={ 24 }
          />
        }
        title={ item.title }
        textStyle={ { color: '#fff' } }
        containerStyle={ {
          borderColor: 'rgba(0.5,0.5,0.5,0.0)',
          padding: 0,
          backgroundColor: 'rgba(0.5,0.5,0.5,0.0)'
        } }
        checked={ item.checked }
        onPress={ () => {
          checkboxHandler(item.value, item.id);
        } }
      />);
  });

  return (
    <View style={ { paddingVertical: height * 0.0147 } }>
      { checkboxes }
    </View>
  );
}
