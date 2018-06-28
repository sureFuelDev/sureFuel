const defaultState = {
    octane: null,
    loginState: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'OCTANE_SELECTED':
            return {
                ...state,
                octane: action.octane
            }
        case 'SET_LOGIN_STATE':
            return {
                ...state,
                loginState: action.value
            }
    }

    return state;
};
