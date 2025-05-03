import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import auth0Client from 'utility/Auth';
import LoadingWidget from 'common/LoadingWidget';

// TODO this is most likely BROKEN

function Callback(){

  const [doneAuthenticating, setAuthenticated] = useState(false);
  console.log('effect 11', doneAuthenticating);

  useEffect(()=>{
    console.log('effect 11', doneAuthenticating);

    auth0Client.handleAuthentication().then(()=>setAuthenticated(true))
    console.log('effect 12', doneAuthenticating);

    setAuthenticated(true);
  })

  const navigate = useNavigate();

  useEffect(() => {
    console.log('effect 2', doneAuthenticating);
    if (doneAuthenticating) {
      console.log('effect 22', doneAuthenticating);

      navigate('/');
    }
  }, [doneAuthenticating, navigate]);

    return (
      <div>
        {doneAuthenticating ? null : <LoadingWidget />}
      </div>)
}

export default Callback;
