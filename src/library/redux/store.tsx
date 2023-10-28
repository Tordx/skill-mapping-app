
import {configureStore} from '@reduxjs/toolkit';
import userslice from './userslice';
import jobslice from './jobslice';
import applicationslice from './applicationslice';
import idslice from './idslice';


export default configureStore({

    reducer: {
        _userdata : userslice,
        _jobdata: jobslice,
        _applicationdata: applicationslice,
        _profileuiddata: idslice,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
})