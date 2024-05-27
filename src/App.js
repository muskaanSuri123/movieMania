import "./App.css";
import React, { useState, useEffect } from "react";
import Movielist from "./components/Movielist";
import Searchbox from "./components/Searchbox";
import Removefav from "./components/Removefav";  
import AddFav from "./components/AddFav";
import mockData from "../src/components/Mockdata.json"
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favourite, setFavourite] = useState([]);

  const getMovie = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson ,  "apidata");

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
    // else { 
    //   setMovies(mockData)
    // }
  }; 


  useEffect(() => {
    getMovie(searchValue);
  }, [searchValue]); 

     const saveToLocalStorage=(items)=>{
     localStorage.setItem('favourites-app',JSON.stringify(items))
  } //bcs when we refresh the page we lose data  */

  const addFav = (movie) => {
    console.log(favourite);
    const newFavouritelist = [...favourite, movie];
    setFavourite(newFavouritelist); 
    console.log(newFavouritelist);
    saveToLocalStorage(newFavouritelist) 
    //passing items in local storg
  };  

  const removefavourite=(movie)=>{
    const newFavouritelist=favourite.filter(
      ( favourite)=>favourite.imdbID!== movie.imdbID
    ) 
    setFavourite(newFavouritelist) 
    saveToLocalStorage(newFavouritelist)
  } 

  //retrieve the local storegw when app loads
   useEffect (()=>{ 
    const localfavourite=JSON.parse(localStorage.getItem('favourites-app')) ;
    if(localfavourite != null){
       setFavourite(localfavourite)
    }
  } , [] );   

  return (
    <div className="App">
      
       <h2> MovieMania </h2>
      <div className="row">
        <div className="top">
          <h2>Search movie name</h2>
          <Searchbox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          ></Searchbox>
        </div>
        <Movielist movies={movies} handlefavclick={addFav}  Overlaycomponent={AddFav}></Movielist>
      </div>
      <div  className="fav">
        <h2>Favourites</h2>
        <Movielist movies={favourite}  handlefavclick={removefavourite} Overlaycomponent={Removefav}></Movielist>{" "}
      </div>
    </div>
  );
};

export default App;
