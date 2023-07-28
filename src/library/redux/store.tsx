
import {configureStore} from '@reduxjs/toolkit';
import userslice from './userslice';
import jobslice from './jobslice';
import applicationslice from './applicationslice';


export default configureStore({

    reducer: {
        _userdata : userslice,
        _jobdata: jobslice,
        _applicationdata: applicationslice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    
})