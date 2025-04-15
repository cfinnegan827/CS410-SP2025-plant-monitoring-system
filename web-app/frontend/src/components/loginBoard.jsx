import React from 'react';
import './loginBoard.css';



function LoginBoard() {

  return (
    
    <div className="loginBoard">
      <div className="loginBoardContainer">
        <h1 className="loginBoardTitle">Login</h1>
        <div className="loginBoardForm">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <button type="submit">Login</button>
        </div>
      </div>
    </div>
    
  );
}

export default LoginBoard;
