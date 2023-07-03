import $host from './index.js'
export async function getHtmlElements(){
   const {data} = await $host.get('htmlElement')
   return data
}
export async function getHtmlElement(id){
   const {data} = await $host.get(`htmlElement/${id}`)
   return data
}
export async function updateHtmlElement(id, params){
   const {data} = await $host.post(`htmlElement/${id}`, params)
   return data
}
export async function createHtmlElement(name){
   const {data} = await $host.post('htmlElement', {name})
   return data
}