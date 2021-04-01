import './SimplePanel.css';
import React from "react";

class SimplePanel extends React.Component {
    render(){
        let {title, data, dataSize} = this.props;
        let dataContent = (<span style={dataSize ? {fontSize: dataSize} : {fontSize:"16px"}}>{data}</span>);
        return (
            <div className="simplePanel">
                <h2>{title}</h2>
                <div>
                    {dataContent}
                </div>
            </div>
        );
    }
}

export default SimplePanel;
