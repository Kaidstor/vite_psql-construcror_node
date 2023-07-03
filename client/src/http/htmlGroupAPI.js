import $host from './index.js'
export async function getHtmlGroups(){
   const {data} = await $host.get('htmlGroup')
   return data
}
export async function getHtmlGroup(id){
   const {data} = await $host.get(`htmlGroup/${id}`)
   return data;
}
export async function addElementToHtmlGroup(id, elementId){
   const {data} = await $host.post(`htmlGroup/${id}/addElement/`, {elementId})
   return data
}
export async function updateHtmlGroup(id, params){
   const {data} = await $host.post(`htmlGroup/${id}`, params)
   return data
}
export async function createHtmlGroup(name){
   const {data} = await $host.post('htmlGroup', {name})
   return data;
}