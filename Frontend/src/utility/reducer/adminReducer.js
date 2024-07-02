const initialState={
    token:"",
    email:"",
    password:"",
    verified:false,
    error:"",
    reg_users:[],
    rank_users:[]
}

const adminReducer = (state=initialState,action) =>{
   switch(action.type){
     case "LOGIN" :
        return{
            ...state,
            token:action.token,
            email:action.username,
            password:action.password,
            verified:action.verified
        }
      case "GET_USERS":
        return{
          ...state,
          reg_users:action.users
        }
      case "GET_RANKS":
         return{
          ...state,
          rank_users:action.result
         }
      case "LOGOUT":
        return{
            ...initialState
        }
      case "DEFAULT":
        return{
           ...initialState
      }
      case "ERROR":
         return{
           ...state,
           error:action.response
         }
      default:
        return{
            ...state
        }

   }

}
export default adminReducer