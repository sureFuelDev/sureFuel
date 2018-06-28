const defaultState = {
    octane: null,
    loginState: 0,
    orderHour: 0,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'OCTANE_SELECTED':
            return {
                ...state,
                octane: action.octane
            };
        case 'ORDER_HOUR_SELECTED':
            return {
                ...state,
                orderHour: action.value
            };
        case 'SET_LOGIN_STATE':
            return {
                ...state,
                loginState: action.value
            }
    }

    return state;
};
