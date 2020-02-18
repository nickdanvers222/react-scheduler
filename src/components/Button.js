import React from "react";
import { action } from '@storybook/addon-actions';
import "./Button.scss";

const classNames = require('classnames');

export default function Button(props) {
   let buttonClass = classNames("button", {
      "button--confirm" : props.confirm,
      "button--danger":props.danger,
   })
   return (
      <button
         onClick={props.onClick}
         className={buttonClass}
         disabled={props.disabled}
         
      >
         {props.children}
      </button>
   )

   
}


//<Button disabled onClick={action("button-clicked")>Disabled</Button>