import React from 'react';
import {connect} from 'react-redux';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
// import { render } from 'react-dom';
import {addMovies,showFavourites} from '../actions';
// import {StoreContext} from '../index';
// import {connect} from '../index';
class App extends React.Component{
  componentDidMount(){
    // const {store}=this.props;
    //called after dispatching and action
    // store.subscribe(()=>{
    //   console.log('Updated');
    //   this.forceUpdate();
    // })
    //make api call
    //dispatch an action
    this.props.dispatch(addMovies(data));
    // console.log('store',this.props.store.getState())
  }
  isMovieFavourite=(movie)=>{
    const {movies} = this.props;
    const {favourites}=movies;
    const index = favourites.indexOf(movie);
    if(index!==-1){
      //found out
      return true;  
    }
    return false;
  }
  OnTabChange=(val)=>{
    this.props.dispatch(showFavourites(val));
    if(val){
      document.getElementsByClassName('tab')[1].classList.add('active-tabs');
      document.getElementsByClassName('tab')[0].classList.remove('active-tabs');
      // console.log('active-fav',tab)
    }else{
      document.getElementsByClassName('tab')[0].classList.add('active-tabs');
      document.getElementsByClassName('tab')[1].classList.remove('active-tabs');
    }
  }
render() {

  console.log('RENDER',this.props);
  // const {movies,search} = this.props.store.getState();  
   //{movies:{},search:{}}
  const {movies,search}=this.props;
  const {list,favourites,showfavourites}= movies; 
  const displayList=showfavourites?favourites:list;
  // return(<StoreContext.Consumer>
    {/* consumer expects callback function 
    store passed as an arg. coz we are passing store 
    as a props value in provider */}
  //   {(store)=>{
      
  // }
         
  //   }
  // </StoreContext.Consumer>)

  return (
    <div className="App">
      <Navbar search={search}/>
      <div className="main">
      <div className='tabs'>
         <div className='tab active-tabs' onClick={()=>{this.OnTabChange(false)}}>Movies</div>
         <div className='tab' onClick={()=>{this.OnTabChange(true)}}>Favourites</div>
      </div>
      <div className='list'>
        {displayList.map((movie,index)=>(
        <MovieCard
          movie={movie}
          key={`movie-${index}`}
          dispatch={this.props.dispatch}
          isFavourite={this.isMovieFavourite(movie)}
        />
        ))
        }
      </div>
      {displayList.length===0?<div>No movies to SHOW!!</div>:null}
      </div>
    </div>
  );
  
}
}
// class AppWrapper extends React.Component{
//   render(){
//      return(
//        <StoreContext.Consumer>
//          { (store)=><App store={store}/>
//             }
//        </StoreContext.Consumer>
//      )    
//   }
// }

function mapStateToProps(state){
  return{
    movies:state.movies,
    search:state.movies
  }
}

const connectedAppComponent = connect(mapStateToProps)(App);
export default connectedAppComponent;
