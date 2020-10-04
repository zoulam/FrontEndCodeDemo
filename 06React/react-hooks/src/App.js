import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ClassComponent from './components/ClassComponent'
import FunctionCompnent from './components/FunctionCompnent'
import SetState from './components/SetState'
import LifeCycle from './components/LifeCycle'
function App() {
  return (
    <div>
      {/* <ClassComponent />
      <FunctionCompnent />
      <SetState /> */}
      <LifeCycle/>
    </div>
  )
}

export default App;
