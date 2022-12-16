import { useState,useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading]=useState(false)
    const emailInputRef= useRef();
    const passwordInputRef=useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event)=>{
    event.preventDefault()
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    setLoading(true);
    if(isLogin){
      //
    }
    else{
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPNIp9dSCeeKozL2CoO9s-UadD2t2Cp5w",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        setLoading(false)
        if (response.ok) {
          //
        } else {
          return response.json().then((data) => {
            let errorMessage = "Authentication Failed! ";

            if (data && data.error && data.error.message){
              errorMessage = data.error.message
            }
            alert(errorMessage);
            console.log(data)
          });
        }
      });
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading&&<button>{isLogin ? "Login" : "Create Account"}</button>}
          {isLoading && <p>Sending request..</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
