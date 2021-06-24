import React from 'react';
import {connect} from 'react-redux';
// import { data } from '../data';
import {addMoviesToList,handleMovieSearch} from '../actions'
// import {StoreContext} from '../index'
// import {connect} from '../index';
class Navbar extends React.Component{
    
  constructor(props){
    super(props);
    this.state={  
      searchText:''
    }
  }
  handleAddToMovies=(movie)=>{
     this.props.dispatch(addMoviesToList(movie));
    //  this.setState({
    //    showSearchResults:false,
    // })
  }

  handleSearch=()=>{
      const {searchText} = this.state;
      this.props.dispatch(handleMovieSearch(searchText));
      console.log('search',searchText)
  }
  handleChange=(e)=>{
    this.setState({
      searchText : e.target.value
    })
  }
    render(){
      // const {showSearchResults} = this.state;
      //rename {result:movie}
      const {result:movie,showSearchResults} =this.props.search;
      if(showSearchResults){
       
        // var {Search}=movie;
        console.log(movie,'title',showSearchResults); 
      }
    
        return (
            <div className="nav">
             <div className='search-container'>
               <input onChange={this.handleChange}/>
               <button onClick={this.handleSearch} id='search-btn'>Search</button>
               {/* {showSearchResults&&
                <div className='search-results'>
                    {Search.map((moviez,index)=>(
                      <div className='search-result'>
                        <img src={moviez.Poster} alt='search-pic'/>
                        <div className='movie-info'>
                          <span>{moviez.Title}</span>
                          <button onClick={()=>this.handleAddToMovies(moviez)}>
                            Add To MOVIES
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
               } */}
               {showSearchResults&&
                <div className='search-results'>   
                      <div className='search-result'>
                        <img src={movie.Poster} alt='search-pic'/>
                        <div className='movie-info'>
                          <span>{movie.Title}</span>
                          <button onClick={()=>this.handleAddToMovies(movie)}>
                            Add To MOVIES
                          </button>
                        </div>
                      </div>
                </div>
               }
             </div>
            </div>
          );
    }

}

// class NavbarWrapper extends React.Component{
//   render(){
//      return(
//        <StoreContext.Consumer>
//          { (store)=><Navbar dispatch={store.dispatch} search={this.props.search}/>
//             }
//        </StoreContext.Consumer>
//      )    
//   }
// }

function mapStateToProps({search}){
  return{
    search
  }
}

const connectedNavbarComponent = connect(mapStateToProps)(Navbar);
export default connectedNavbarComponent;
