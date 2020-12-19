import React from 'react';
import PropTypes from 'prop-types';
import {CirclePicker} from 'react-color';
import {useTheme} from '@material-ui/core/styles';

function ColorPicker(props) {
  const theme = useTheme();
  const {selectThemePalettePrimary} = props;
  const [color, setColor] = React.useState(theme.palette.primary.main);

  const handleColorChange = (themeColor, event) => {
    // console.log(themeColor.hex);
    setColor(themeColor.hex);
    selectThemePalettePrimary(themeColor.hex);
  };

  return (
    <CirclePicker
      color={color}
      onChange={handleColorChange}
    />
  );
}

ColorPicker.propTypes = {
  selectThemePalettePrimary: PropTypes.func.isRequired,
};

export default ColorPicker;
