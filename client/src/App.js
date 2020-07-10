// @ts-nocheck
// @ts-ignore
import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar.js';
import ShoppingList from './components/ShoppingList.js';
import ItemModal from "./components/ItemModal.js";
import {Provider} from "react-redux";
import {Container} from "reactstrap";
import store from "./store";
import {loadUser } from "./actions/authActions.js";


class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
  return (
    <Provider store={store}>
    <div className="App">
      <AppNavbar />
      <Container>
        <ItemModal/>
        <ShoppingList />
      </Container>
    </div>
    </Provider>
  );
}
}

export default App;
