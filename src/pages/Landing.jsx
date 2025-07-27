import React from "react";

import { useLoaderData } from "react-router-dom";
import { axiosInstance } from "../utils/customInstance";
import SearchForm from "../components/SearchForm";
import CocktailList from "../components/CocktailList";


import { useQuery } from '@tanstack/react-query';

const searchCocktailsQuery = (searchTerm) => {
  return {
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      // Default to 'a' if no search term is provided since API has changed
      searchTerm = searchTerm || 'a';

      const response = await axiosInstance(`/search.php?s=${searchTerm}`);
      return response.data.drinks;
    },
  };
};


export const loader = (queryClient) => async ({request}) => {
   const url = new URL(request.url);
   const searchTerm = url.searchParams.get('search') || 'vodka';
  // const response = await axiosInstance(`/search.php?s=${searchTerm}`);
  // return { drinks: response.data.drinks, searchTerm };


  //ensureQueryData---> essentially we check,do we have this data in the cache or no?
     await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));

  return {
    searchTerm
  }
};

const Landing = () => {
  // const {
  //   drinks, searchTerm
  // } = useLoaderData();
    const {
     searchTerm
  } = useLoaderData();
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm));

  return <>

       <SearchForm searchTerm={searchTerm}/>
      <CocktailList drinks={drinks} /> 
      </>
};

export default Landing;
