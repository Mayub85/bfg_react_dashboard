import './PopUp.css';
import React from "react";

export const ErrorType = {
    ERROR: "ERROR",
    WARNING: "WARNING",
    OK: "OK",
    DEFAULT: "DEFAULT"
}

class PopUp extends React.Component {

    constructor(props){
        super(props);
    }

    onClose = ()=>{
        if(this.props.onClose){
            this.props.onClose();
        }
    }

    render(){
        let { message, type, title } = this.props;
        let content;
     
        content =( 
                    <div className={"popUpContainer"}>
                        <h3 className={type ? type.toLowerCase() : "default"}>
                            {title}
                            <button className="closeBtn" onClick={this.onClose}>X</button>
                        </h3>
                        <span>{message && message.length > 0 ? message : "N/A"}</span>
                    </div>);
        
        return (
            <div className="popUp">
                {content}
            </div>
        );
    }
}

export default PopUp;
