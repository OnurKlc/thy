import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import "./Header.scss";

export default function Header() {
  const location = useLocation()
  const [color, setColor] = useState()

  useEffect(() => {
    if (location.pathname === "/search-flights") {
      setColor("light")
    } else {
      setColor("dark")
    }
  }, [location.pathname])

  return (
    <div id="header" className={color}>
      <div className="font-weight-bold">turkishairlines.com</div>
      <div>
        <span>search</span>
        <span className="font-weight-bold">Flight Challenge</span>
      </div>
    </div>
  )
}
