import React from 'react'

export default function Alert(props) {
    const capitalize=(word)=>{
      if(word === "danger")
        word = "Error";
      const lower=word.toLowerCase();
      return lower.charAt(0).toUpperCase()+lower.slice(1);
    }
  return (
    <div style={{height:'60px'}} >
    {props.alert && <div className={`alert  alert-dismissible fade show alert-${props.alert.type}`} role="alert">
  <strong>{capitalize(props.alert.type)} </strong>{props.alert.msg}
</div>}
</div>
  )
}
