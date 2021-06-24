// {
//     type:'ADD_MOVIES',
//     movies : [m1,m2,m3]
// }
//action types
export const ADD_MOVIES='ADD_MOVIES';
export const ADD_FAVOURITE='ADD_FAVOURITE';

export const REMOVE_FAVOURITE='REMOVE_FAVOURITE';

export const SHOW_FAVOURITES='SHOW_FAVOURITES';

export const ADD_MOVIES_TO_LIST='ADD_MOVIES_TO_LIST';

export const ADD_SEARCH_RESULT='ADD_SEARCH_RESULT';


//action creators
export function addMovies(movies){
    return {
        type:ADD_MOVIES,
        movies
    }
}
export function addFavourite(movie){
    return {
        type:ADD_FAVOURITE,
        movie
    }
}
export function removeFavourite(movie){
    return {
        type:REMOVE_FAVOURITE,
        movie
    }
}
export function showFavourites(val){
    return {
        type:SHOW_FAVOURITES,
        val
    }
}

export function addMoviesToList(movie){
    return{
        type:ADD_MOVIES_TO_LIST,
        movie
    }
}


// export function addSearchResult(movie){
//     return{
//         type:ADD_SEARCH_RESULT,
//         movie
//     }
// }

//thunk  
export function handleMovieSearch(movie){
    const url =`http://www.omdbapi.com/?apikey=3ca5df7&t=${movie}`;
    return function(dispatch){
    console.log(movie,'handlemovie')
    fetch(url)
    .then(response=>response.json())
    .then(movie=>
        {console.log('movie',movie)
         //dispatch an action
         dispatch(addMovieSearchResult(movie));
    });
    }
}

export function addMovieSearchResult(movie){
    return{
        type:ADD_SEARCH_RESULT,
        movie
    }
}