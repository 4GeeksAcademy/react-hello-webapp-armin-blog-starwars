// export const initialStore=()=>{
//   return{
//     message: null,
//     todos: [
//       {
//         id: 1,
//         title: "Make the bed",
//         background: null,
//       },
//       {
//         id: 2,
//         title: "Do my homework",
//         background: null,
//       }
//     ]
//   }
// }

// export default function storeReducer(store, action = {}) {
//   switch(action.type){
//     case 'add_task':

//       const { id,  color } = action.payload

//       return {
//         ...store,
//         todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
//       };
//     default:
//       throw Error('Unknown action.');
//   }    
// }

// store.js
export const initialStore = () => {
  return {
    people: [],
    vehicles: [],
    planets: [],
    favorites: [],
    loading: false
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case 'SET_PEOPLE':
      return {
        ...store,
        people: action.payload
      };
    case 'SET_VEHICLES':
      return {
        ...store,
        vehicles: action.payload
      };
    case 'SET_PLANETS':
      return {
        ...store,
        planets: action.payload
      };
    case 'ADD_FAVORITE':
      // Verificar si el elemento ya existe en favoritos
      if (store.favorites.some(item => 
        item.id === action.payload.id && 
        item.type === action.payload.type)) {
        return store; // No hacer nada si ya existe
      }
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };
    case 'REMOVE_FAVORITE':
      return {
        ...store,
        favorites: store.favorites.filter(item => 
          !(item.id === action.payload.id && 
            item.type === action.payload.type))
      };
    case 'SET_LOADING':
      return {
        ...store,
        loading: action.payload
      };
    default:
      return store; // Solo devolvemos el store sin cambios en caso de acción desconocida
  }    
}