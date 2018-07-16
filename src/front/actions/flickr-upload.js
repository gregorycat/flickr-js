export const uploadFiles = params => dispatch => {
    var formData = new FormData();

    for (const image of params.files) {
        console.log(typeof image);
        formData.append("image", image);
    }

    formData.append("albumName", "TEST");

    window.axios
        .post("/api/flickr/upload-photos", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            dispatch({
                type: "TYPE",
                payload: response.data
            });
        });
};
