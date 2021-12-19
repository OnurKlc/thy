import React from "react";
import errorImg from "../../assets/img/istockphoto-1156845283-612x612.jpeg"

export function ErrorPage() {

  return (
    <div style={{width: "100vw", height: "100vh"}} className="d-flex">
      <img src={errorImg} alt="error" className="mx-auto" />
    </div>
  )
}
