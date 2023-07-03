export default function reducer(state, action) {

   if (action.type === 'changeTableName') {
      state.name = action.value
      return state
   }
   if (action.type === 'changeColName') {
      return {
         ...state,
         [action.colId]: {
            ...state[action.colId],
            name: action.name
         },
      };
   }
   if (action.type === 'changeTable') {
      const {state, name, id} = action
      if (!Object.keys(state || []).length) return {name, id}
      state.name = name
      state.id = id
      return state
   }
   else if (action.type === 'add') {
      const col = {
         type: 'text',
         name: 'name',
         hidden: false
      }

      if (!state)
         return {
            col: 1,
            col_1: col
         }

      return {
         ...state,
         col: ++state.col || 1,
         [`col_${state.col || 1}`]: col
      }
   }
   else if (action.type === 'changeListType') {
      const column = state[action.colId]
      return {
         ...state,
         [action.colId]: {
            ...column,
            meta: {
               listType: action.listType,
               ref: null
            }
         },
      };
   }
   else if (action.type === 'changeListEssence') {
      const column = state[action.colId]
      return {
         ...state,
         [action.colId]: {
            ...column,
            meta: {
               listType: '1',
               ref: action.ref
            }
         },
      };
   }
   else if (action.type === 'changeType') {
      if (action.colType === 'list')
         return {
            ...state,
            [action.colId]: {
               ...state[action.colId],
               type: action.colType,
               meta: {
                  listType: '0',
                  ref: null
               }
            },
         };

      return {
         ...state,
         [action.colId]: {
            ...state[action.colId],
            type: action.colType
         },
      };
   }
   return state
}