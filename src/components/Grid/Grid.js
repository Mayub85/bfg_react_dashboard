import './Grid.css';
import React from "react";

class Grid extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            columns:[]
        };
    }


    getColumns = ()=>{
        let columns = [];
        for (const property in this.props.data[0]) {
            //console.log(`${property}: ${object[property]}`);
            columns.push(property);
        }
        return columns;
    }

    render(){
        let { data, title, onRefresh } = this.props;
        let columns = this.getColumns();
        
        // let headers = (<div className="headerContainer">
        //                     {columns.map((col, i)=>{ return(
        //                                 <div className="headerCol" key={"headerCol_" + i.toString() }>
        //                                     <span>{col.toString()}</span>
        //                                 </div>);
        //                     })}
        //                 </div>);

        let dataContent;
        if(data && Object.keys(data).length > 0){
            dataContent =
                        (<div className="dataContainer">
                            <div className="dataRow" key={0}>
                                {columns.map((col, i)=>{ return(
                                            <div className="dataCol header" key={"headerCol_" + i.toString() }>
                                                <span>{col.toString()}</span>
                                            </div>);
                                })}
                            </div>
                            { data.map((val, i)=>{
                                return(
                                    <div className="dataRow" key={i}>
                                        {columns.map((col, j)=>
                                            {
                                                return (<div className="dataCol" key={`dataCol_${i.toString()}_${columns[j]}`}>
                                                            <span>{val[columns[j]] ? val[columns[j]].toString() : "N/A"}</span>
                                                        </div>);
                                            })
                                        }
                                    </div>)
                            })}
                        </div>);
        } else {
            dataContent = (<p className="noData">N/A</p>);
        }

        return (
            <div className="grid">
                {typeof onRefresh != "undefined" &&
                    <div className="refresh"><button onClick={onRefresh}><img src="/images/refresh.svg" alt="Refresh"></img></button></div>}
                <h2>{title}</h2>
                <div className="container">
                    {/* {headers} */}
                    {dataContent}
                </div>
            </div>
        );
    }
}

export default Grid;
