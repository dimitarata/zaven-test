import { useEffect, useState } from 'react';
import useOnLogin, { ILoginProps, ILoginResponseProps } from '../../hooks/useOnLogin';
import Cookies from 'js-cookie';
import LoginForm from './LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';



const Login = () => {

    const history = useHistory();
    const [loginData, setLoginData] = useState<ILoginProps>({
		username: '',
		password: '',
	});
    
    
	const { success, errorMessage }: ILoginResponseProps = useOnLogin(loginData);

	useEffect(() => {
		if (Cookies.get('token')) history.push('/dashboard');
	}, [history]);

	useEffect(() => {
		if (success) history.push('/dashboard');
	}, [success, history]);


    return <LoginForm errorMessage={errorMessage} handleLogin={(e) => setLoginData(e)} />;
}

export default Login
