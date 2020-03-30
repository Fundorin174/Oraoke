import React from 'react';
import classes from './../stylesheet/Button.module.scss'
import starBtn from './../../img/StarOnBtn.svg'

const Button = (props) => {
  return(
    <div className={classes.btnwrp}>
      <div className={classes.star}>
        <img src={starBtn} alt="Star"/>
        <span>{props.btnNumber}</span>
      </div>
      <div className={classes.text}>
        <span>{props.btnText}</span>
      </div>
    </div>
  )
}

export default Button