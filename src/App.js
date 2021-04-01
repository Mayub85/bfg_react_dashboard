import './App.css';
import React from "react";
import SimplePanel from "./components/SimplePanel/SimplePanel";
import Panel from "./components/Panel/Panel";

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        ready:false,
        users: {},
        products: {},
        pTypes: {}
    }
  }

  getUsers = () => {
    this.setState({
      ready:false,
      users: {}
    });

    let requestOptions = {
      method: 'GET',
    };

    fetch(`http://localhost:3000/api/users`, requestOptions)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
        console.log(data);
      this.setState({
          ready:true,
          users: data
        });  
    })
    .catch(error=>{
        console.log(error);
    });
  }

  getProducts = () => {
    this.setState({
      ready:false,
      products: {}
    });

    let requestOptions = {
      method: 'GET',
    };

    fetch(`http://localhost:3000/api/products`, requestOptions)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
        console.log(data);
      this.setState({
          ready:true,
          products: data
        });  
    })
    .catch(error=>{
        console.log(error);
    });
  }

  getProductTypes = () => {
    this.setState({
      ready:false,
      pTypes: {}
    });

    let requestOptions = {
      method: 'GET',
    };

    fetch(`http://localhost:3000/api/products/types`, requestOptions)
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
        console.log(data);
      this.setState({
          ready:true,
          pTypes: data
        });  
    })
    .catch(error=>{
        console.log(error);
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
      return (<SimplePanel title="Total de usuarios" dataSize={"42px"} data={users.data.count}/>);
    } else{
      return (<SimplePanel title="Total de usuarios" dataSize={"16px"} data={"Cargando..."}/>);
    }
  }

  getSimplePanelProducts = ()=>{
    let {products} = this.state;
    if(products && Object.keys(products).length > 0){
      return (<SimplePanel title="Total de productos" dataSize={"42px"} data={products.data.count}/>);
    } else{
      return (<SimplePanel title="Total de productos" dataSize={"16px"} data={"Cargando..."}/>);
    }
  }

  getSimplePanelProductTypes = ()=>{
    let {pTypes} = this.state;
    if(pTypes && Object.keys(pTypes).length > 0){
      return (<SimplePanel title="Total tipos de producto" dataSize={"42px"} data={pTypes.data.count}/>);
    } else{
      return (<SimplePanel title="Total tipos de producto" dataSize={"16px"} data={"Cargando..."}/>);
    }
  }

  getPanelLastUser = ()=>{
    let {users} = this.state;
    if(users && Object.keys(users).length > 0){
      //var max = dates.reduce(function (a, b) { return a > b ? a : b; });
      let usersArr = users.data.users;
      let lastCreatedUser = usersArr.reduce((a,b)=>{ return new Date(a.createdAt) > new Date(b.createdAt) ? a: b });

      let content =
      (<div style={{padding:"10px"}}>
        <p><strong>Nombre:</strong> {lastCreatedUser.name + " " + lastCreatedUser.lastName}</p>
        <p><strong>Email:</strong> {lastCreatedUser.email}</p>
        <p><strong>Fecha creación:</strong> {this.GetFormattedDate(new Date(lastCreatedUser.createdAt))}</p>
      </div>);

      return (<Panel title="Último usuario registrado" content={content}/>);
    } else{
      return (<Panel title="Último usuario registrado" content={<p style={{textAlign:"center"}}>Cargando...</p>}/>);
    }
  }

  getPanelLastProduct = ()=>{
    let {products} = this.state;
    if(products && Object.keys(products).length > 0){
      //var max = dates.reduce(function (a, b) { return a > b ? a : b; });
      let productsArr = products.data.products;
      let lastCreatedProduct = productsArr.reduce((a,b)=>{ return new Date(a.createdAt) > new Date(b.createdAt) ? a: b });

      let content =
      (<div style={{padding:"10px"}}>
        <p><strong>Nombre:</strong> {lastCreatedProduct.name}</p>
        <p><strong>Descripción:</strong> {lastCreatedProduct.ShortDescription}</p>
        <p><strong>Precio:</strong> {lastCreatedProduct.Price}</p>
        <p><strong>Fecha creación:</strong> {this.GetFormattedDate(new Date(lastCreatedProduct.createdAt))}</p>
        <p><strong>Tipo de producto:</strong> {lastCreatedProduct.types.name}</p>
      </div>);

      return (<Panel title="Último producto registrado" content={content}/>);
    } else{
      return (<Panel title="Último producto registrado" content={<p style={{textAlign:"center"}}>Cargando...</p>}/>);
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


  render = () => {
    return (
            <main className="App">
              <h1 className="app-title">Dashboard BFG</h1>
              <div className="panel-group">
                {this.getSimplePanelUsers()}
                {this.getSimplePanelProducts()}
                {this.getSimplePanelProductTypes()}
                {this.getPanelLastUser()}
                {this.getPanelLastProduct()}
              </div>
            </main>
          );
  }
}

export default App;
