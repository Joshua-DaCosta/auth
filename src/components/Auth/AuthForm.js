import React, { useContext, useState } from 'react';
import { signIn, signUp } from '../../api/authCalls';
import { AuthContext } from '../../store/AuthProvider';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  function resetForm() {
    setEmail('');
    setPass('');
  }


  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if(isLogin){
      const {idToken} = await signIn(email, pass);
      authCtx.login(idToken);
    }else{
      await signUp(email, pass);
      resetForm();
    }
    setIsLoading(false);
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            id="password"
            autoComplete="current-password"
            required
          />
          <p className={classes.passWarn}>
            password must be 6 characters or greater
          </p>
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {isLoading && <p className={classes.passWarn}>Sending Request...</p>}
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
}


export default AuthForm;
