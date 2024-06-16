import React, { createContext, useState } from "react";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import MatchSelectLayout from "./layouts/MatchSelectLayout";

function App() {
  return (
    <div className="flex w-screen h-screen overflow-hidden ">
      <MatchSelectLayout></MatchSelectLayout>
      <MainLayout></MainLayout>
    </div>
  );
}

export default App;
