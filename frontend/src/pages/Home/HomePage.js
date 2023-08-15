import React, { useEffect, useReducer } from 'react'
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { getAll, getAllByTags, getAllTags, search } from '../../Services/foodService';
import { useParams } from 'react-router';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import NotFound from '../../components/NotFound/NotFound';

const initialState ={foods:[], tags:[]};
const reducer = (state, action) => {
    switch (action.type){
        case 'FOODS_LOADED':
            return {...state, foods: action.payload};
        case 'TAGS_LOADED':
            return {...state, tags: action.payload};
        default:
            return state;
    }
}

const Homepage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {foods, tags} = state;
    const { searchTerm, tag } = useParams();
    useEffect(() => {
        getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));
    
        const loadFoods = tag
          ? getAllByTags(tag)
          : searchTerm
          ? search(searchTerm)
          : getAll();
    
        loadFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));
      }, [searchTerm, tag]);
        
  return (
    <>
    <Search />
    <Tags tags={tags} />
    {foods.length === 0 && <NotFound linkText="Reset Search" />}
    <Thumbnails foods={foods} />
    </>
  )
}

export default Homepage