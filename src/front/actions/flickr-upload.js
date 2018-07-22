export const uploadFiles = params => dispatch => {
    var formData = new FormData();

    for (const image of params.files) {
        formData.append("image", image);
    }

    formData.append("albumName", params.albumName);
    formData.append("albumId", params.albumId);

    window.axios
        .post("/api/flickr/upload-photos", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            console.log(response)
            dispatch({
                type: "UPLOAD_PHOTO",
                payload: response.data
            });
        });
};


export const listAlbums = () => dispatch => {
    window.axios.get('/api/flickr/list-album').then(response => {
        console.log(response.data);
        dispatch({
            type: "LIST_ALBUMS",
            payload: response.data
        });
    })
};

export const getUploadStatus = () => dispatch =>{ 
    window.axios.get('/api/flickr/get-upload-status').then(response => {
        dispatch({
            type: "UPLOAD_STATUS",
            payload: response.data
        });
    })
}

export const getPhotoCount = () => dispatch => {
    window.axios.get('/api/flickr/get-photo-count').then(response => {
        dispatch({
            type: 'PHOTO_COUNT',
            payload: response.data
        })
    }) 
}

export const getProfile = () => dispatch => {
    window.axios.get('api/flickr/get-profile').then(response => {
        console.log(response);

        dispatch({
            type: 'PROFILE',
            payload: response.data
        })
    })
}
