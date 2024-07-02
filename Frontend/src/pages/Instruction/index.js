import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startTest } from "../../utility/action/testAction";
import Alert from "../../components/alert";

const Instruction = () => {
  // const [userName,setUserName] = useState(null)
  const [prompt, setPrompt] = useState(false);

  // const test = useSelector((state)=>state.test)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(()=>{
  //     setUserName(localStorage.getItem("email"))
  // },[])

  // useEffect(()=>{
  //     if(localStorage.getItem("start_test"))
  //       navigate("/test")
  // },[test.startTest,navigate])

  const dismiss_alert = () => {
    setPrompt(false);
  };

  const start_test = () => {
    Promise.resolve(dispatch(startTest())).then(() => {
      navigate("/test");
    });
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/background_dark.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className={`hero min-h-screen bg-slate-800  bg-opacity-60 `}>
          <div className="w-screen  flex justify-center items-center min-h-[80vh] ">
            <div className="box w-10/12 md:w-5/12 flex items-center justify-center  px-12 py-4 rounded-2xl  d-flex flex-col shadow-[0px_10px_53px_8px_#ffbe2d] bg-slate-950/50 ">
              <h3 className="text-3xl font-bold  text-center text-white">
                Back Story
              </h3>
              <p className="text-md text-white text-center mt-4">
                In the vibrant city of Mumbai, Varun and Gauri, two adventurous
                souls bound by friendship, stumbled upon an ancient map in a
                dusty bookstore. The map whispered tales of a hidden treasure,
                buried on a remote island far across the sea.
              </p>
              <p className="text-md text-white text-center mt-2">
                With hearts pounding with excitement, Varun and Gauri made a
                pact to chase the legend and uncover the fabled riches. Armed
                with courage and determination, they set sail into the unknown,
                ready to face whatever challenges awaited them on their quest
                for fortune and glory.
              </p>
              <p className="text-md text-white text-center mt-2">
                Are you ready to sail with them in this vast ocean of
                virtuality?
              </p>
              <div className="my-4">
                <button
                  onClick={() => {
                    setPrompt(true);
                  }}
                  className="cursor-pointer py-2 px-3 mt-4 rounded-xl w-full border focus:border-yellow-300 bg-slate-950/100 border-blue-600 border-1 bg-yellow-500 outline-none "
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>

          {prompt && (
            <>
              <Alert
                message="Are you sure, want to START the TEST"
                successFunc={start_test}
                dismissFunc={dismiss_alert}
              />
            </>
          )}

          {/* {prompt && (<div>
            <p>Sure To start the TEST</p>
            <button onClick={()=>{dispatch(startTest())}}>OK</button>
            <button onClick={()=>{setPrompt(false)}}>NO</button>
        </div>)}
        <button onClick={()=>{setPrompt(true)}}>Start Test</button> */}
        </div>
      </div>
    </>
  );
};

export default Instruction;
