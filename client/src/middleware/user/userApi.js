import { ADD_USER, CHANGE_PASS, CHECK_EMAIL, GET_USER, LOGIN, SEND_CODE, SIGN_UP } from "./actions";

const userApi = store => next => action => {

    if(action.type === SEND_CODE) {
        fetch("/send-code", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: action.email, code: action.code})
        }).then( () => next({type: SEND_CODE}))
    }

    if(action.type === ADD_USER) {

        let data = {
            user_name: action.user_name,
            password: action.password,
            email: action.email,
            avatar: action.avatar
        };

        fetch("/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( res => res.json()).then( (data) => {
            localStorage.setItem('user_name', data.user_name);
            localStorage.setItem('avatar', data.avatar);
            localStorage.setItem('email', data.email);
            next(action)
        });
    }

    else if(action.type === LOGIN) {
        let data = {
            user_name: action.user_name,
            password: action.password
        };

        fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then( (data) => {
            if(data.message === 'login false') {
                alert('user_name or password wrong!')
            }
            else {
                localStorage.setItem('user_name', data.user_name);
                localStorage.setItem('email', data.email);
                localStorage.setItem('avatar', data.avatar);
                localStorage.setItem('role', data.role);
                next(action)
            }
        });
    }

    else if(action.type === SIGN_UP) {
        let data = {
            user_name: action.user_name
        };

        fetch("/sign-up", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json()).then( (data) => {
            if(data.message === 'sign up false') {
                alert('user name existed!');
            }
            else {
                next(action);
            }
        });
    }

    else if(action.type === CHANGE_PASS) {
        let data = {
            user_name: action.user_name,
            password: action.password,
        };

        fetch("/user", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( res => res.json()).then(data => {
            alert(data.message);
            next({
                type: CHECK_EMAIL,
            })
        });
    }

    else if(action.type === CHECK_EMAIL) {
        fetch("/user/check-email", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: action.email})
        }).then( res => res.json()).then(data => {
            if(data.user_name === '') {
                alert('email not exist?');
            }
            next({
                type: CHECK_EMAIL,
                users: data
            })
        });
    }

    else if(action.type === GET_USER) {
        fetch("/user/check-email", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: action.email})
        }).then( res => res.json()).then(data => next({type: GET_USER, users: data})
        );
    }

    else {
        next(action);
    }
};

export default userApi;