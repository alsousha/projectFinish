import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //get user data from localStorage and parse it from JSON
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  //This funcs update Context and call api funcs for update BD
  const login = async (inputs) => {
    const res = await axios.post('/auth/login', inputs); //get user's data

    const userTmp = res.data;

    if (userTmp.role === 'teacher') {
      //get subjects
      try {
        const res = await axios.get(`/sbjs/${userTmp.id_user}`);
        const totalUserData = { ...userTmp, sbjs: res.data };
        setCurrentUser(totalUserData);
      } catch (err) {
        console.log(err);
      }

      // console.log(res.data);
      // console.log(userTmp.id_user);
    } else if (userTmp.role === 'student') {
      //get class level
      try {
        const res = await axios.get(`/student/${userTmp.id_user}/class-level`);
        const totalUserData = { ...userTmp, lvl: res.data.classLevel };
        setCurrentUser(totalUserData);
      } catch (err) {
        console.log(err);
      }
    }

    // console.log(res.data);
    // setCurrentUser(res.data); //send login fun to controller and update state
    // console.log('res' + JSON.stringify(res).data);
  };
  const updateUser = async (data) => {
    // const res = await axios.post('/auth/updateUser', inputs);
    setCurrentUser(data);
    // console.log('res' + JSON.stringify(res).data);
  };
  const logout = async () => {
    if (window.confirm('Are you sure want to exit?')) {
      await axios.post('/auth/logout');
      setCurrentUser(null);
    }
  };
  const deleteUser = async () => {
    if (window.confirm('Are you sure want to delete this acount?')) {
      try {
        await axios.delete(`/auth/${currentUser.id_user}`);
        setCurrentUser(null);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    //update localstorage when we change user data
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    //set data (currentUser, login, logout) to context
    <AuthContext.Provider value={{ currentUser, login, logout, deleteUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
