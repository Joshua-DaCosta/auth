import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { changePass } from '../../api/authCalls';
import { AuthContext } from '../../store/AuthProvider';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {

  const [newPass, setNewPass] = useState('');
  const ctx = useContext(AuthContext);
  const history = useHistory();


  const submitHandler = async (e) => {
    e.preventDefault();
    if(newPass.trim() === '') return;
    await changePass(ctx.token, newPass);
    setNewPass('');
    ctx.logout();
    history.replace('/auth');
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input value={newPass} onChange={(e) => setNewPass(e.target.value)} type='password' id='new-password' minLength='6' />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
