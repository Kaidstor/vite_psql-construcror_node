import React from "react";
import {useQuery} from "@tanstack/react-query";
import SearchItemsForm from "../modules/SearchItemsForm";
import {createHtmlElement, getHtmlElements} from "../http/htmlElementAPI.js";
import {CreateFunctionContext} from "../context/CreateFunctionContext.js";

const HtmlElementsPage = () => {
   const {data, isLoading} = useQuery({
      queryKey: ['elements'],
      queryFn: getHtmlElements
   })

   return <CreateFunctionContext.Provider value={createHtmlElement}>
      <SearchItemsForm isLoading={isLoading} data={data}/>
   </CreateFunctionContext.Provider>
}

export default HtmlElementsPage