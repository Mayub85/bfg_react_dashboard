import './Grilla.css';
import React from "react";
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

class Grilla extends React.Component {

    renderHeader = () => {
        return (
            <div className="table-header">
                {this.props.title}
            </div>
        );
    }

    productSDescriptionTemplate = (rowData) => {
        return (
            <div>
                <textarea rows="10" style={{width: "100%"}} value={rowData.ShortDescription} disabled>
                </textarea>
            </div>
        );
    }

    productLDescriptionTemplate = (rowData) => {
        return (
            <div>
                <textarea rows="20" style={{width: "100%"}} value={rowData.LargeDescription} disabled>
                </textarea>
            </div>
        );
    }

    productSpecsTemplate = (rowData) => {
        return (
            <div>
                <textarea rows="20" style={{width: "100%"}} value={rowData.Specs} disabled>
                </textarea>
            </div>
        );
    }

    productImageTemplate = (rowData) => {
        return (
            <div>
                {rowData.Images && rowData.Images.length > 0 ? <img src={rowData.Images[0]} style={{height: "80px"}} /> : <span>N/A</span> }
            </div>
        );
    }

    productTypeTemplate = (rowData) => {
        return (
            <div>
                {rowData.types.name}
            </div>
        );
    }

    productStateTemplate = (rowData) => {
        return (
            <div>
                {rowData.states.name}
            </div>
        );
    }

    productBrandTemplate = (rowData) => {
        return (
            <div>
                {rowData.brands.name}
            </div>
        );
    }

    productCreatedTemplate = (rowData) => {
        return (
            <div>
                {rowData.createdAt && rowData.createdAt.length > 0 ? this.formatDate(rowData.createdAt) : "N/A"}
            </div>
        );
    }

    formatDate = (dateString) => {
        let date = new Date(dateString);
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        return `${day}-${month}-${date.getFullYear()}`;
    }

    render(){
        let { products, onRefresh } = this.props;
      
        return (<div className="grilla">
                    {(products && products.length > 0) &&
                        <DataTable 
                        value={products} 
                        header={this.renderHeader()}
                        resizableColumns
                        >
                            <Column field="id" header="Id"></Column>
                            <Column field="name" header="Nombre"></Column>
                            <Column field="ShortDescription" header="Descripción Corta" body={this.productSDescriptionTemplate}></Column>
                            <Column field="LargeDescription" header="Descripción Larga" body={this.productLDescriptionTemplate}></Column>
                            <Column field="Specs" header="Especificaciones" body={this.productSpecsTemplate}></Column>
                            <Column field="Price" header="Precio"></Column>
                            <Column field="Images" header="Imágenes" body={this.productImageTemplate}></Column>
                            <Column field="ProductType" header="Tipo de producto" body={this.productTypeTemplate}></Column>
                            <Column field="ProductState" header="Estado de producto" body={this.productStateTemplate}></Column>
                            <Column field="Brand" header="Marca" body={this.productBrandTemplate}></Column>
                            <Column field="Code" header="Código"></Column>
                            <Column field="createdAt" header="Creado" body={this.productCreatedTemplate}></Column>
                        </DataTable>
                    }
                </div>
        );
    }
}

export default Grilla;
