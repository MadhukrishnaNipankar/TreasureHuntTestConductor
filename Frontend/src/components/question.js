import React from "react";

const Question = ({ question, questionNo }) => {
  return (
    <>
      <div
        className="flex"
        style={{
          maxHeight: "20rem",
          overflowY: "auto",
        }}
      >
        <p
          className="text-white text-2xl"
          dangerouslySetInnerHTML={{ __html: questionNo + ". " + question }}
        />
      </div>
    </>
  );
};

export default Question;
