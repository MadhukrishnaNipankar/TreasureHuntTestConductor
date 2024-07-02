import React from 'react'

function Alert({message,successFunc,dismissFunc,status}) {

  const return_img_msg=()=>{
      if(status===0) return "./warning.png"
      else if(status===1) return "./success.png"
      else return "./correct_ans.png"
  }
  return (
<div class="w-2xl md:w-1/3 mx-auto">
  <div class="flex flex-col p-5 rounded-lg shadow bg-white">
	<div class="flex flex-col items-center text-center">
	  <div class="flex justify-center items-center p-4 bg-yellow-50 rounded-full">
     <img src={return_img_msg()} alt="" style={{height:"30%",width:"30%"}}/>
	  </div>
	  <h2 class="mt-2 font-semibold text-gray-800">{status===1?"Message":"Warning"}</h2>
	  <p class="mt-2 text-sm text-gray-600 leading-relaxed">
   {message}</p></div>
  {status===2?"":
	<div class="flex items-center mt-3">
    {
    status===1?
    <button onClick={()=>{dismissFunc()}} class="flex-1 px-4 py-2 ml-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-md">
      OK
    </button>:
    <>
	  <button onClick={()=>{dismissFunc()}} class="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
		Cancel
	  </button>
	  <button onClick={()=>{successFunc()}} class="flex-1 px-4 py-2 ml-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-md">
		Agree
	  </button>
    </>
    }
	</div>
   }
  </div>
</div>
  )
}

export default Alert


