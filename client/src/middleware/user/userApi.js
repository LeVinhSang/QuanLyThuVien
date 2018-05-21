import {ADD_USER, LOGIN, SEND_CODE} from "./actions";

const userApi = store => next => action => {

    if(action.type === SEND_CODE) {
        fetch("/send-code", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: action.email, code: action.code})
        }).then( () => next({
            type: SEND_CODE,
        }));
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
            next({
                type: SEND_CODE,
                user: data
            })
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
                next(action)
            }
        });
    }

    else {
        next(action);
    }
};

export default userApi;