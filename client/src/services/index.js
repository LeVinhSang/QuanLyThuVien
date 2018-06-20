import axios  from 'axios';
import config from '../config';

import BorrowerService     from './BorrowerService';
import BookService         from './BookService';
import LoginService        from './LoginService';
import NotificationService from "./NotificationService";

axios.interceptors.request.use(axiosConfig => {
    //TODO add token here
    //bla bla
    return axiosConfig;
}, error => {
    return Promise.reject(error);
});

axios.interceptors.response.use(
    response => response,
    error => {
        if ( error.response && +error.response.status === 403 ) {
            return window.location.reload();
        }
        return Promise.reject(error.response);
    }
);
export let borrowerService     = new BorrowerService(axios, config);
export let bookService         = new BookService(axios, config);
export let loginService        = new LoginService(axios, config);
export let notificationService = new NotificationService(axios, config);
