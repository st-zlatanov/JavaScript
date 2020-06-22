import {getPartials, setHeaderInfo, displayError, displaySuccess} from '../shared.js';
import {get, post, put, del} from '../requester.js';
function saveAuthInfo(userInfo){
    sessionStorage.setItem('authtoken', userInfo._kmd.authtoken);
    sessionStorage.setItem('username', userInfo.username);
    sessionStorage.setItem('userId', userInfo._id);
}
export function getRegister(ctx){
    setHeaderInfo(ctx);
    this.loadPartials(getPartials())
    .partial('./views/auth/register.hbs');
}

export function postRegister(ctx){
    const { username, password, rePassword } = ctx.params;
    
    if(username.length >= 3 && password.length>=6 && password === rePassword){
        post('user', '', {username, password}, 'Basic')
        .then((userInfo) => {
            displaySuccess('Successfully registered user!');
            saveAuthInfo(userInfo);
            ctx.redirect('/');
        })
        .catch(()=>displayError('Something went wrong!'));
    }else{
        displayError('Username should be atleast 3 characters and password should be at least 6 characters.');
    }
}

export function getLogin(ctx){
    setHeaderInfo(ctx);
    this.loadPartials(getPartials())
    .partial('./views/auth/login.hbs');
}

export function postLogin(ctx){
    const {username, password } = ctx.params;
            if(username && password){
                post('user', 'login',{username, password }, 'Basic' )
                .then((userInfo) => {
                    displaySuccess('Successfully logged user!');
                    saveAuthInfo(userInfo);
                    ctx.redirect('/');

                })
                .catch(()=>displayError('Invalid credentials! Please retry your request with valid credentials.'));
            }
}

export function logout(ctx){
    post('user', '_logout', {}, 'Kinvey')
    .then(()=>{
        displaySuccess('Logout successful!');
        sessionStorage.clear();
        ctx.redirect('/');

    })
    .catch(()=>displayError('Something went wrong!'));
}