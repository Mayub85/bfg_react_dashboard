import './GridItem.css';
import React from "react";

class GridItem extends React.Component {

    render(){
        let { title, data, onRefresh } = this.props;
        let dataContent;
        if(data && Object.keys(data).length > 0){
            
            dataContent = data.map((val, i)=>{
                
            });
        } else {
            dataContent = (<p className="noData">N/A</p>);
        }

        return (
            <div className="grid">
                {typeof onRefresh != "undefined" &&
                    <div className="refresh"><button onClick={onRefresh}><img src="/images/refresh.svg" alt="Refresh"></img></button></div>}
                <h2>{title}</h2>
                {dataContent}
            </div>
        );
    }
}

export default GridItem;
