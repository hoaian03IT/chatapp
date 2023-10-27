export const loginReducer = {
    loginRequest: (state) => {
        state.isFetching = true;
        state.error = false;
        state.messageError = null;
    },
    loginSuccess: (state, action) => {
        state.isFetching = false;
        state.currentUser = action.payload;
    },
    loginFailed: (state, action) => {
        state.isFetching = false;
        state.messageError = action.payload;
        state.error = true;
    },
};
