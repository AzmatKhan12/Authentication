import React,{useContext,useRef} from 'react';
import AuthContext from '../Store/Auth-context';
import classes from './ProfileForm.module.css';


const ProfileForm = () => {
  const passwordInputRef =  useRef();
  const  authCtx= useContext(AuthContext);
  const submitHandler = event =>{
    event.preventDefault();
    const enteredPassword = passwordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDPNIp9dSCeeKozL2CoO9s-UadD2t2Cp5w",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredPassword,
          returnSecureToken : true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(response =>{
       // assumption always succeed
    });
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
