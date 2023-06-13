import $host from './index.js'
export async function getTables(){
   const {data} = await $host.get('table')
   console.log(data)
   return data.data;
}

export async function getTable(id){
   const {data} = await $host.get('table/' + id)
   return data.data;
}

export async function saveTable(id, structure){
   const {data} = await $host.post('table/' + id, {structure})
   return data.data;
}
export async function addTable(){
   const {data} = await $host.post('table/add')
   return data.data;
}
export async function removeTable(id){
   const {data} = await $host.post(`table/${id}/remove`)
   return data;
}