import React from 'react';
import classes from './ChangeVolumeForm.scss';
import InputRange from 'react-input-range';


let ChangeVolumeForm = (props) => {
  
  return(
    <>
        <InputRange
          maxValue={20}
          minValue={0}
          value={this.state.value}
          onChange={value => this.props.changeVolume({ value })} />
    </>
  )
}

export default ChangeVolumeForm;