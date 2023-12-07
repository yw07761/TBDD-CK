// redux/reducer.js
export const addUser = (user) => ({
    type: 'ADD',
    payload: user
  });
  
  export const deleteUser = (id) => ({
    type: 'DELETE',
    payload: id
  });
  
  export const updateUser = (id, updatedInfo) => ({
    type: 'UPDATE',
    payload: { id, updatedInfo }
  });
  
  const initialState = {
    users: [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "address": [
          {
            "street": "123 Main St",
            "city": "Cityville",
            "country": "Countryland"
          }
        ],
        "password": "password123"
      },
    ],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD':
        const addNewUser = action.payload;
        const newUsers = [...state.users, addNewUser];
        return {
          ...state,
          users: newUsers
        };
  
      case 'DELETE':
        const deleteId = action.payload;
        const newDeleteUser = state.users.filter((u) => u.id !== deleteId);
        return {
          ...state,
          users: newDeleteUser,
        };
  
      case 'UPDATE':
        const updatedId = action.payload.id;
        const updatedInfo = action.payload.updatedInfo;
  
        const newUpdateUser = state.users.map((u) =>
          u.id === updatedId
            ? { ...u, ...updatedInfo }
            : u
        );
  
        return {
          ...state,
          users: newUpdateUser
        };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  