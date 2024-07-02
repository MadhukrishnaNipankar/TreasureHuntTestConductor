import Login from "../../components/login";
import { useState } from "react";
import HeroSection from "../../components/HeroSection";
import Logo from "../../components/Logo";

// Import Logo Images

const Home = () => {
  const [displayLogin, setDisplayLogin] = useState(false);
  const logoData = [
    {
      imgSrc: "Logo's/Ieee.png",
      title: "IEEE",
    },
    {
      imgSrc: "Logo's/IeeeFlag.png",
      title: "IEEE Pune Section",
    },
    {
      imgSrc: "Logo's/Itsa.png",
      title: "ITSA",
    },
    {
      imgSrc: "Logo's/Itsoc.png",
      title: "ITSOC",
    },
    {
      imgSrc: "Logo's/PccoeChapter.png",
      title: "PCCOE Chapter",
    },
  ];

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
          {!displayLogin ? (
            <div className=" w-full h-screen items-center justify-center flex flex-col">
              <HeroSection />
              <button
                onClick={() => {
                  setDisplayLogin(true);
                }}
                className="px-8 py-3 mt-8 text-medium text-orange-700 font-bold text-2xl hover:bg-yellow-500 bg-yellow-400 rounded-xl"
              >
                Login
              </button>
              {/* Logo's */}

              <p id="praxis-desc" className="text-xl text-center text-blue-200">
                Brought to you by the Information Technology Student Association
                (ITSA), Codechef PCCOE Chapter, PCCOE IEEE Student Branch, PCCOE
                ITSOC Chapter and IEEE Pune Section.
              </p>
              <div id="praxis-logo-container">
                {logoData.map((logo) => {
                  return <Logo imgSrc={logo.imgSrc} title={logo.title} />;
                })}
              </div>
            </div>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
