import {createSlice} from '@reduxjs/toolkit';

export const profileuidSlice = createSlice({

    name: 'profileuid',
    initialState: {
        profileuid: [],
    },
    reducers: {
        setprofileuid: (state, action) => {
            state.profileuid = action.payload
            console.log(action)
        },
    }

})

export const {setprofileuid} = profileuidSlice.actions
export default profileuidSlice.reducer
