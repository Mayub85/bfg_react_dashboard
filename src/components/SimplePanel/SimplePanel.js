import './SimplePanel.css';
import React from "react";

class SimplePanel extends React.Component {
    render(){
        let {title, data, dataSize, onRefresh} = this.props;
        let dataContent = (<p style={dataSize ? {fontSize: dataSize} : {fontSize:"16px"}}>{data}</p>);
        return (
            <div className="simplePanel">
                {typeof onRefresh != "undefined" &&
                    <div className="refresh"><button onClick={onRefresh}><img src="/images/refresh.svg" alt="Refresh"></img></button></div>}
                <h2>{title}</h2>
                <div>
                    {dataContent}
                </div>
            </div>
        );
    }
}

export default SimplePanel;
