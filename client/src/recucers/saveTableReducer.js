export default function reducer(state, action) {

   if (action.type === 'changeCol') {

      console.log({
         ...state,
         [action.col]: action.value
      })

      return {
         ...state,
         [action.col]: action.value
      }
   }

   if (action.type === 'setRecord') {
      return action.value
   }

   if (action.type === 'setImgHtmlContainer') {
      console.log(state);
      console.log({
         ...state,
         [action.col]: {...state[action.col], ...action.value}
      });
      return {
         ...state,
         [action.col]: {...state[action.col], ...action.value}
      }
   }

   return state
}