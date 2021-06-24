import {combineReducers} from 'redux';


// pure functions
import {ADD_MOVIES,
    ADD_FAVOURITE,
    REMOVE_FAVOURITE,
    SHOW_FAVOURITES,
    ADD_MOVIES_TO_LIST,
    ADD_SEARCH_RESULT
     } from '../actions';

const initialMoviesState={
    list:[],
    favourites:[],
    showfavourites:false,
}
export function movies(state=initialMoviesState,action){
    // if(action.type===ADD_MOVIES){
    //     return {
    //       ...state,
    //       list:action.movies
    //     }
    // }
    // return state 
    switch(action.type){
    case ADD_MOVIES:
        return{
            ...state,
            list:action.movies
        }
    case ADD_FAVOURITE:
        return{
        ...state,
        favourites:[action.movie,...state.favourites]
        }
    case REMOVE_FAVOURITE:
        const filteredArray = state.favourites.filter(
            movie=>movie.Title!==action.movie.Title
        );
        return{
            ...state,
            favourites:filteredArray
        }
    case SHOW_FAVOURITES:
        return {
          ...state,
          showfavourites:action.val
        }
    case ADD_MOVIES_TO_LIST:
        return {
            ...state,
            list: [action.movie, ...state.list]
        }
    default:
        return state
    }
}

const initialSearchState={
  result:[],
  showSearchResults:false,
}
export function search(state=initialSearchState,action){
   switch(action.type){
       case ADD_SEARCH_RESULT:
           return{
               ...state,
               result:action.movie,
               showSearchResults:true,
           }
        case ADD_MOVIES_TO_LIST:
            return{
                ...state,
                showSearchResults:false
            }
        default:
            return state
   }
}

// const initialRootState={
//    movies:initialMoviesState,
//    search:initialSearchState
// }
// export default function rootReducer(state=initialRootState,action){
//      return{
//          movies:movies(state.movies,action),
//          search:search(state.search,action),
//      }
// }

export default combineReducers({
    movies,
    search
})