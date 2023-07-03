import $host from './index.js'
export async function getTables(){
   const {data} = await $host.get('table')
   return data.data;
}

export async function getTable(id){
   const {data} = await $host.get('table/' + id)
   return data.data;
}
export async function getTableRecord(tableId, id){
   const {data} = await $host.get('table/' + tableId + '/' + id)
   return data;
}
export async function saveTable(id, structureWithName){
   const {data} = await $host.post('table/' + id, {...structureWithName})
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
export async function getEntities(tableId){
   const {data} = await $host.get('entity/table_' + tableId + '/')
   return data;
}
export async function saveEntity(tableId, id, entity){
   const {data} = await $host.post('entity/table_' + tableId + '/' + id, prepareFormData(entity))
   return data;
}

export async function addEntity(tableId, entity){
   const {data} = await $host.post('entity/table_' + tableId + '/', prepareFormData(entity))
   return data;
}

function prepareFormData(data){
   const formData = new FormData()
   const filesInfo = {}
   Object.keys(data).forEach(key => {
      if (data[key].hasOwnProperty('files')) {
         filesInfo[key] = []
         data[key].files.forEach(file => {
            filesInfo[key] = [file.name]
            formData.append('files', file)
         })

         formData.append(key, JSON.stringify(data[key]))
      }
      else if (typeof data[key] === 'object')
         formData.append(key, JSON.stringify(data[key]))
      else
         formData.append(key, data[key])
   })

   formData.append('filesInfo', JSON.stringify(filesInfo))

   return formData;
}