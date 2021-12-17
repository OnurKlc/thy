import React from "react";
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import * as Pages from "./pages";

export default function RouteContents() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/search-flights" />}/>
        <Route path="search-flights" element={<Pages.FlightSearch />} />
        <Route path="list-flights" element={<Pages.FlightList />} />
        <Route path="result" element={<Pages.Result />} />
        <Route path="error" element={<Pages.ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
