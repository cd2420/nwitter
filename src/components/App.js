import React,{useEffect, useState} from 'react'
import AppRouter from 'components/Router';
import { authService } from 'fBase';


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObject] = useState(null);
  useEffect( 
    () => {
    authService.onAuthStateChanged((user) => {
      if(user) {
    
       // setUserObject(user);

        setUserObject({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
       } else {
         setUserObject(null);
       }
       setInit(true);

    });
  } , []);

  const refreshUser = () => {
    const user = authService.currentUser;
   
    //setUserObject(Object.assign({}, user)); // 빈 객체생성 한다음 그 빈 객체를 user객체로 바꿈.
   
    setUserObject({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }
  
  return (
    <>
    {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
   
    </>
  );
}

export default App;
