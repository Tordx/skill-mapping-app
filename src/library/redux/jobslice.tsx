import {createSlice} from '@reduxjs/toolkit';

export const JobSlice = createSlice({

    name: 'jobdata',
    initialState: {
        JobData: [],
    },
    reducers: {
        setjobdata: (state, action) => {
            state.JobData = action.payload
            console.log(action)
        },
    }

})

export const {setjobdata} = JobSlice.actions
export default JobSlice.reducer
