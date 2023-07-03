import React from "react";
import {useQuery} from "@tanstack/react-query";
import SearchItemsForm from "../modules/SearchItemsForm";
import {createHtmlGroup, getHtmlGroups} from "../http/htmlGroupAPI.js";
import {CreateFunctionContext} from "../context/CreateFunctionContext.js";

const HtmlGroupsPage = () => {
   const {data, isLoading} = useQuery({
      queryKey: ['groups'],
      queryFn: getHtmlGroups
   })

   return <CreateFunctionContext.Provider value={createHtmlGroup}>
      <SearchItemsForm isLoading={isLoading} data={data}/>
   </CreateFunctionContext.Provider>
}

export default HtmlGroupsPage