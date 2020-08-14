import React from "react";

function WsrList(props) {
  return (
    <>
      {props.wsr.map((wsr) => (
        <MaterialWeightSetReps key={wsr.id} id={wsr.id} />
      ))}
    </>
  );
}

export default WsrList;
