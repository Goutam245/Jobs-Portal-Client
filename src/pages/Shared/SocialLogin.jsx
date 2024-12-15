import React from 'react';
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext/AuthContext';
import { FcGoogle } from "react-icons/fc";


const SocialLogin = () => {
    const { signInwithGoogle } = useContext(AuthContext)

    const handleGoogleSignIn = () => {
        signInwithGoogle()
        .then(result => {
            console.log(result.user)
        })
        .catch(error => {
            console.log(error.message)
        })
    }
    return (
        <div>
           <button onClick={handleGoogleSignIn} className='btn'><FcGoogle />Google</button>
        </div>
    );
};

export default SocialLogin;