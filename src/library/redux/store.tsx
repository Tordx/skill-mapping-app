
import {configureStore} from '@reduxjs/toolkit';
import userslice from './userslice';
import jobslice from './jobslice';


export default configureStore({

    reducer: {
        _userdata : userslice,
        _jobdata: jobslice
    }
    
})