
import {configureStore} from '@reduxjs/toolkit';
import userslice from './userslice';
import jobslice from './jobslice';
import applicationslice from './applicationslice';
import idslice from './idslice';
import archiveslice from './archiveslice';


export default configureStore({

    reducer: {
        _userdata : userslice,
        _jobdata: jobslice,
        _applicationdata: applicationslice,
        _profileuiddata: idslice,
        _archivedata: archiveslice,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
})