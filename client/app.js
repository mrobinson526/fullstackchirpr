const fetchChirps = () => {
    $.ajax({
        url: "/api/chirps",
        dataJSON: 'json',
        success: (chirps) => {
            chirps.forEach((chirp) => {
                $('#chirp-list').prepend(`
                    <div class="card m-3" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${chirp.username}</h5>
                            <p class="card-text">${chirp.message}</p>
                            <img src="https://helpdeskgeek.com/wp-content/pictures/2019/08/delete-1024x682.png" alt="delete trashcan" class="delete-btn" id="delete-btn${chirp.id}" onclick="deleteChirp(${chirp.id})">

                            <button type="button" class="btn btn-primary" class="edit-btn" id="edit-btn${chirp.id}" data-bs-toggle="modal" data-bs-target="#edit-chirp${chirp.id}">
                                Edit
                            </button>
                        </div>
                    </div>

                    <div class="modal fade" id="edit-chirp${chirp.id}" tabindex="-1" aria-labelledby="edit-username${chirp.id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="edit-username${chirp.id}" >${chirp.username}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            <div class="modal-body">
                                <textarea id="edit-message${chirp.id}" rows="4" cols="50">${chirp.message}</textarea>
                            </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onclick="editChirp(${chirp.id})">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `)
            })
        }
    });
};

const postChirp = (e) => {
    e.preventDefault()

    $.post({
        url: "/api/chirps",
        data: JSON.stringify({
            username: $("#username-input").val(),
            message: $("#message-input").val()
        }),
        contentType: 'application/json',
        success: () => {
            $("#chirp-list").empty();
            fetchChirps();
        }
    });
};

const deleteChirp = id => {
    $.ajax({
        url: `/api/chirps/${id}`,
        method: "DELETE",
        success: () => {
            $("#chirp-list").empty();
            fetchChirps();
        }
    });
}

const editChirp = id => {
    $.ajax({
        url: `/api/chirps/${id}`,
        method: "PUT",
        data: JSON.stringify({
            username: $(`#edit-username${id}`).val(),
            message:  $(`#edit-message${id}`).val()
        }),
        contentType: 'application/json',
        success: () => {
            $("#chirp-list").empty();
            fetchChirps();
        }
    });
}

$("#submit-btn").click((e) => postChirp(e))

fetchChirps();