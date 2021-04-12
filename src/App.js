import './App.css';
import React from "react";
import SimplePanel from "./components/SimplePanel/SimplePanel";
import Panel from "./components/Panel/Panel";
import Grid from './components/Grid/Grid';
import PopUp from './components/PopUp/PopUp';
import {ErrorType} from './components/PopUp/PopUp';
import Grilla from './components/Grilla/Grilla';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        ready: false,
        users: {},
        products: {},
        pTypes: {},
        showError: false,
        errorMsg: "",
        qsColl: this.getQueryStringValues()
    }
  }

  apiCall = (url, method, callback) =>{
    let requestOptions = {
      method: method,
    };

    fetch(url, requestOptions)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      callback(data);
    })
    .catch(error=>{
      this.showError(error);
    });
  }

  showError (error) {
    console.log(error);
    this.setState({
      showError: true,
      errorMsg: "Hubo un problema: " + error.toString()
    });
  }


  getQueryStringValues = ()=>{
    let arr = window.location.search.slice(1, window.location.search.length).split('&');
    return arr.map(qs=> {
                          let splitted = qs.split("=");
                          return {
                                    Name: splitted[0],
                                    Value: splitted[1]
                                }
                        });
  }

  getQueryStringValue = (name)=>{
    let {qsColl} = this.state;
    let qs = qsColl.find(qs=>qs.Name.toLowerCase() === name.toLowerCase());
    return qs !== undefined ? qs.Value : undefined;
  }

  getUsers = () => {
    this.setState({
      ready:false,
      users: {}
    });
    
    let fakeDelay = this.getQueryStringValue("delayUsers");
    setTimeout(()=>{
      this.apiCall("http://localhost:3000/api/users",
                  "GET",
                  (data)=>{
                            this.setState({
                                      ready:true,
                                      users: data
                                    });
                    });
                  },
                  fakeDelay? fakeDelay : 0
                  )
  }

  getProducts = () => {
    this.setState({
      ready:false,
      products: {}
    });
    let fakeDelay = this.getQueryStringValue("delayProd");
    setTimeout(()=>{
      this.apiCall("http://localhost:3000/api/products",
                  "GET",
                  (data)=>{
                    this.setState({
                            ready:true,
                            products: data
                          });
                  });
                },
                fakeDelay? fakeDelay : 0);
  }

  getProductTypes = () => {
    this.setState({
      ready:false,
      pTypes: {}
    });

    this.apiCall("http://localhost:3000/api/products/types",
    "GET",
    (data)=>{
     this.setState({
             ready:true,
             pTypes: data
           });
    });
  }

  componentDidMount = () => {
    this.getUsers();
    this.getProducts();
    this.getProductTypes();
  }

  getSimplePanelUsers = ()=>{
    let {users} = this.state;
    if(users && Object.keys(users).length > 0){
      if(users.meta.status === 500){
        // this.showError(users.data.msg);
        return (<SimplePanel title="Total de usuarios" dataSize={"16px"} data={"N/A"} onRefresh={this.getUsers}/>);
      }else{
        return (<SimplePanel title="Total de usuarios" dataSize={"42px"} data={users.data.count} onRefresh={this.getUsers}/>);
      }
    } else{

        return (<SimplePanel title="Total de usuarios" dataSize={"16px"} data={"Cargando..."} onRefresh={this.getUsers}/>);

    }
  }

  getSimplePanelProducts = ()=>{
    let {products} = this.state;
    if(products && Object.keys(products).length > 0){
      if(products.meta.status === 500){
        return (<SimplePanel title="Total de productos" dataSize={"16px"} data={"N/A"} onRefresh={this.getProducts}/>);
      } else {
        return (<SimplePanel title="Total de productos" dataSize={"42px"} data={products.data.count} onRefresh={this.getProducts}/>);
      }
    } else{
      return (<SimplePanel title="Total de productos" dataSize={"16px"} data={"Cargando..."} onRefresh={this.getProducts}/>);
    }
  }

  getSimplePanelProductTypes = ()=>{
    let {pTypes} = this.state;
    if(pTypes && Object.keys(pTypes).length > 0){
      if(pTypes.meta.status === 500){
        return (<SimplePanel title="Total tipos de producto" dataSize={"16px"} data={"N/A"} onRefresh={this.getProductTypes}/>);
      } else {
        return (<SimplePanel title="Total tipos de producto" dataSize={"42px"} data={pTypes.data.count} onRefresh={this.getProductTypes}/>);
      }
    } else{
      return (<SimplePanel title="Total tipos de producto" dataSize={"16px"} data={"Cargando..."} onRefresh={this.getProductTypes}/>);
    }
  }

  getPanelLastUser = ()=>{
    let {users} = this.state;
    if(users && Object.keys(users).length > 0 && typeof users.data.users != "undefined"){
      let usersArr = users.data.users;
      let lastCreatedUser = usersArr.reduce((a,b)=>{ return new Date(a.createdAt) > new Date(b.createdAt) ? a: b });

      let content =
      (<div style={{padding:"10px"}}>
        <p><strong>Nombre:</strong> {lastCreatedUser.name + " " + lastCreatedUser.lastName}</p>
        <p><strong>Email:</strong> {lastCreatedUser.email}</p>
        <p><strong>Fecha creación:</strong> {this.GetFormattedDate(new Date(lastCreatedUser.createdAt))}</p>
      </div>);

      return (<Panel title="Último usuario registrado" content={content} onRefresh={this.getUsers}/>);
    } else{
      if(users && Object.keys(users).length > 0 && users.meta.status === 500){
        return (<Panel title="Último usuario registrado" content={<p style={{textAlign:"center", color: 'blue', fontWeight:"bolder"}}>N/A</p>} onRefresh={this.getUsers}/>);
      }
      else {
        return (<Panel title="Último usuario registrado" content={<p style={{textAlign:"center", color: 'blue', fontWeight:"bolder"}}>Cargando...</p>} onRefresh={this.getUsers}/>);
      }
    }
  }

  getPanelLastProduct = ()=>{
    let {products} = this.state;
    if(products && Object.keys(products).length > 0 && typeof products.data.products != "undefined"){
      let productsArr = products.data.products;
      let lastCreatedProduct = productsArr.reduce((a,b)=>{ return new Date(a.createdAt) > new Date(b.createdAt) ? a: b });

      let content =
      (<div style={{padding:"10px", display:"flex"}}>
        <div>
          <p><strong>Nombre:</strong> {lastCreatedProduct.name}</p>
          <p><strong>Descripción:</strong> {lastCreatedProduct.ShortDescription}</p>
          <p><strong>Precio:</strong> {lastCreatedProduct.Price}</p>
          <p><strong>Fecha creación:</strong> {this.GetFormattedDate(new Date(lastCreatedProduct.createdAt))}</p>
          <p><strong>Tipo de producto:</strong> {lastCreatedProduct.types.name}</p>
        </div>
        {(lastCreatedProduct.Images && lastCreatedProduct.Images.length > 0) &&
          <img src={lastCreatedProduct.Images[0]} style={{height:"200px"}} alt="Producto"></img>
        }
      </div>);

      return (<Panel title="Último producto registrado" content={content} onRefresh={this.getProducts}/>);
    } else{
      if(products && Object.keys(products).length > 0 && products.meta.status === 500){
        return (<Panel title="Último producto registrado" content={<p style={{textAlign:"center", color: 'blue', fontWeight:"bolder"}}>N/A</p>} onRefresh={this.getProducts}/>);
      }
      else {
        return (<Panel title="Último producto registrado" content={<p style={{textAlign:"center", color: 'blue', fontWeight:"bolder"}}>Cargando...</p>} onRefresh={this.getProducts}/>);
      }
    }
  }

  getPanelProductTypes = ()=>{
    let {products, pTypes} = this.state;
    if((products && Object.keys(products).length > 0 && typeof products.data.products != "undefined") &&
       (pTypes && Object.keys(pTypes).length > 0 && typeof pTypes.data.types != "undefined")){
      let productsArr = products.data.products;
      let pTypesArr = pTypes.data.types;
      
      let ptWithProdCount = pTypesArr.map(pt=>{//pt.name == "CONSOLA" por ej
        return {
          pType: pt.name,
          pCount: productsArr.filter(prod=> prod.types.name === pt.name).length
        }
      });

      let content =
      (<div style={{padding:"10px"}}>
        {ptWithProdCount.map(ob=>{
          return <p><strong>Tipo de producto:</strong> {ob.pType} <strong>/ Cantidad: </strong> {ob.pCount}</p>
        })}  
      </div>);

      return (<Panel title="Tipos de productos" content={content} onRefresh={this.getProducts}/>);
    } else{
      if(products && Object.keys(products).length > 0 && products.meta.status === 500){
        return (<Panel title="Tipos de productos" content={<p style={{textAlign:"center", color: 'blue', fontWeight:"bolder"}}>N/A</p>} onRefresh={this.getProducts}/>);
      }
      else {
        return (<Panel title="Tipos de productos" content={<p style={{textAlign:"center", color: 'blue', fontWeight:"bolder"}}>Cargando...</p>} onRefresh={this.getProducts}/>);
      }
    }
  }

  GetFormattedDate = (date) => {
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day  = ("0" + (date.getDate())).slice(-2);
    var year = date.getFullYear();
    var hour =  ("0" + (date.getHours())).slice(-2);
    var min =  ("0" + (date.getMinutes())).slice(-2);
    var seg = ("0" + (date.getSeconds())).slice(-2);
    return `${day}/${month}/${year}  ${hour}:${min}:${seg}`;
  }

  PopUpOnCloseHandler = ()=>{
    this.setState({
      showError: false,
      errorMsg: ""
    });
  }

  render = () => {
    let { ready, products, showError, errorMsg } = this.state;
    return (
            <main className="App">
              <h1 className="app-title">
                <span>Dashboard BFG</span>
                {!ready &&
                  <img src="/images/marioRun.gif" alt="Loading..."></img>
                }
              </h1>
              <div className="panel-group">
              <div className="panel-group-row">
                {this.getSimplePanelUsers()}
                {this.getSimplePanelProducts()}
                {this.getSimplePanelProductTypes()}
              </div>
              <div className="panel-group-row">
                {this.getPanelLastUser()}
                {this.getPanelLastProduct()}
                {this.getPanelProductTypes()}
              </div>
                {/* <Grid data={products && Object.keys(products).length > 0 ? products.data.products : {}} title="Listado de productos" onRefresh={undefined}></Grid> */}
                <Grilla products={products && Object.keys(products).length > 0 ? products.data.products : []} title="Listado de productos"/>
              </div>
              {  showError &&

                <PopUp message={errorMsg} type={ErrorType.ERROR} title="Error" onClose={this.PopUpOnCloseHandler}></PopUp>
              }
            </main>
          );
    }
  }

  export default App;




