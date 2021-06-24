import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './components/App';
import rootReducer from './reducers'

//function logger (obj,next,action)
//logger will be called internally by redux
//logger(obj)(next)(action)
// const logger = function({dispatch,getState}){  //this object is not store
//   return function(next){
//       return function (action){
//        console.log('ACTION_TYPE=',action.type);
//        next(action);
//        //middleware code
//       }
//   }
// }

//implicit return when there is 1 statement
const logger=({dispatch,getState})=>(next)=>(action)=>{
  if(typeof action!=='function'){ 
  console.log('ACTION_TYPE=',action.type);
  }
  next(action); 
}
// const thunk=({dispatch,getState})=>(next)=>(action)=>{
//   console.log('ACTION_TYPE=',typeof action);
//    if(typeof action==='function'){
//      action(dispatch);
//      return
//    }
//    next(action);
// }

//passing movies function to create store
const store = createStore(rootReducer,applyMiddleware(logger,thunk));
console.log('store',store)
//initial state
console.log('store.getstate() before',store.getState());

//dispatching an action object - redux will send whole action object to the reducer internally
//which we pass while creating the store
// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:[{name:'Superman'}]
// });

//state after dispatching
console.log('store.getstate() after',store.getState());

// export const StoreContext = createContext();
// console.log('StoreContext',StoreContext);

// class Provider extends React.Component{
//   render(){
//     const {store}=this.props;
//   return  <StoreContext.Provider value={store}>
//     {this.props.children}
//   </StoreContext.Provider>


//   }
// }

// export function connect(callback){
//   return function(Component){
//       class ConnectedComponent extends React.Component{
//        constructor(props){
//         super(props);
//         //unsunscribe to memory tweeks
//         this.unsubscribe = this.props.store.subscribe(()=>{
//           console.log('Updated');
//           this.forceUpdate();
//         });
//       }

//       componentWillUnmount(){
//         this.unsubscribe();
//       }
//        render(){
//         const {store}= this.props
//         const state = store.getState();
//         const dataToBePassedAsProps = callback(state);
//         return (
//         <Component {...dataToBePassedAsProps} dispatch={store.dispatch} />  // dispatch passed as default
//         );
//        }
//      }

//      class ConnectedComponentWrapper extends React.Component{
//        render(){
//         return(
//           <StoreContext.Consumer>
//             { (store) => <ConnectedComponent store={store}/>
//                }
//           </StoreContext.Consumer>
//           );
//        }
//      }
//      return ConnectedComponentWrapper
//   }
// }

ReactDOM.render(
  <Provider store={store}>
   <App/>
   </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PW