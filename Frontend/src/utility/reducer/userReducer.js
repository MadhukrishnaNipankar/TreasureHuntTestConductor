const initialState={
    token:"",
    email:"",
    password:"",
    verified:false,
    error:""
}

const userReducer = (state=initialState,action) =>{
   switch(action.type){
     case "LOGIN" :
        return{
            ...state,
            token:action.token,
            email:action.username,
            password:action.password,
            verified:action.verified
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
export default userReducer