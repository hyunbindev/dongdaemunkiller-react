import {createSlice , PayloadAction} from '@reduxjs/toolkit';
import { act } from 'react';

export interface UserState {
    uuid: string | null,
    name: string | null,
    profile: string | null,
    position: string | null,
    money: number | null,
    coin: number | null,
    sheriff: boolean | null,
}

const initialState: UserState = {
    uuid: null,
    name: null,
    profile: null,
    position: null,
    money: null,
    coin: null,
    sheriff: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser(state, action: PayloadAction<UserState>) {
            return action.payload;
        },
        setUserUuid: (state, action: PayloadAction<string | null>) => {
            state.uuid = action.payload;
        },
        setUserName: (state, action: PayloadAction<string | null>) => {
            state.name = action.payload;
        },
        setUserProfile: (state, action: PayloadAction<string | null>) => {
            state.profile = action.payload;
        },
        setUserPosition: (state, action: PayloadAction<string | null>) => {
            state.position = action.payload;
        },
        setUserMoney: (state, action: PayloadAction<number | null>) => {
            state.money = action.payload;
        },
        setUserCoin: (state, action: PayloadAction<number | null>) => {
            state.coin = action.payload;
        },
        setSherriff: (state, action: PayloadAction<boolean | null>) => {
            state.sheriff = action.payload;
        },
        logoutUser(){
            return initialState;
        }
    },
})
export const { loginUser, setUserUuid, setUserName, setUserProfile, setUserPosition, setUserMoney, setUserCoin, logoutUser } = userSlice.actions;
export default userSlice.reducer;