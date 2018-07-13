export const uploadFiles = params => dispatch => {
    window.axios.get('URL').then(response => {
        dispatch({
            type: 'TYPE',
            payload: response.data,
        });
    });
};
