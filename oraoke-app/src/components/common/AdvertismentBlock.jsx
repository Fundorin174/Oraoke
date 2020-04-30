import React from 'react';
import classes from './../stylesheet/AdvetrtBlock.module.scss';

const AdvertismentBlock = React.memo((props) => {

 

  return (
    <div className={classes.advertBlock}>
      <a href={props.adv.url} target='blank'>
        <div className = {classes.advWrp}>
          <img src={props.adv.img} alt="adv3" />
          <div className={classes.text}>
            <p>{props.adv.text[props.currentLanguage]}</p>
          </div>
        </div>        
      </a>
    </div>
  )
});

export default AdvertismentBlock

