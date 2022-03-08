import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function Wave({ customStyles }) {
  return (
    <View style={ customStyles }>
      <Svg
        height="100%"
        width="100%"
        viewBox="0 0 1440 320"
      >
        <Path
          fill="#ffffff"
          fillOpacity={ 1 }
          d="M0,192L80,208C160,224,320,256,480,240C640,224,800,160,960,144C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        />
      </Svg>
    </View>);
}

Wave.propTypes = {
  customStyles: ViewPropTypes.style,
};
