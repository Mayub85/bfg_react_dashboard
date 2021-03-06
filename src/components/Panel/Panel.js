import './Panel.css';
import React from "react";

class Panel extends React.Component {

    render(){
        let { title, content, onRefresh } = this.props;
        let dataContent;
        if(content && Object.keys(content).length > 0){
            dataContent = content;
        } else {
            dataContent = (<p className="noData">N/A</p>);
        }

        return (
            <div className="panel">
                {typeof onRefresh != "undefined" &&
                    <div className="refresh"><button onClick={onRefresh}><img src="/images/refresh.svg" alt="Refresh"></img></button></div>}
                <h2>{title}</h2>
                {dataContent}
            </div>
        );
    }
}

export default Panel;
