const loadAllCategory = async () => {
    try {
        const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
        const data = await response.json();
        return data.data.news_category;
    } catch (error) {
        console.log({ error });
    }

}

const setAllMenu = async () => {
    const data = await loadAllCategory();
    // console.log(data);
    const menu = document.getElementById("all-menu");
    for (const category of data) {
        const li = document.createElement("li");
        li.innerHTML = `<button class = " btb category-item" onclick = setNews(${category.category_id})>${category.category_name}</button>`;
        menu.appendChild(li);
    }
}




const getNews = async (id) => {
    try {
        const response = await fetch(' https://openapi.programming-hero.com/api/news/category/' + '0' + id)
        const myJson = await response.json();
        let data = myJson.data;
        data.sort((a, b) => (a.total_view > b.total_view ? -1 : 1))
        return data;
    } catch (error) {
        console.log(error);
    }

}


const setNews = async (id) => {
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("d-none");
    const data = await getNews(id);
    spinner.classList.add("d-none");
    const dataNotFound = document.getElementById("data-not-found");
    dataNotFound.textContent = '';
    const div = document.createElement('div');
    const totalItems = document.getElementById('items-found');
    totalItems.textContent = '';
    const totalItemDiv = document.createElement('div')
    totalItemDiv.innerHTML = `<div class="found-item py-4" >
     <h5>${data.length} items found for category Entertainment</h5>
    </div>`;
    totalItems.appendChild(totalItemDiv);
    const card = document.getElementById("card-display");
    card.textContent = '';

    if (data.length > 0) {
        spinner.classList.add("d-none");
        for (const item of data) {
            const div = document.createElement("div");
            div.innerHTML = `
            
            <div class="row g-0 p-3 align-items-center border mb-3 rounded shadow ">
            <div class="col-md-4">
                <img src=${item.image_url} alt="..." class="img-fluid">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text py-3">${item.details.slice(0, 200) + '...'}</p>
                    <div class="row">
                        <div class="col-6 d-flex align-items-center">
                            <img src=${item.author.img} class="author-img me-2" alt="">
                            <div class="author-name">
                                <p>${item.author.name != null ? item.author.name : "author name not found"}</p>
                            </div>
                        </div>
                        <div class="col-3 d-flex align-items-center">
                            <p><i class="fa-solid fa-eye eye-icon"></i>${item.total_view != null ? item.total_view :
                    "view not found"}</p>
                        </div>
                        <div class="col-3 d-flex align-items-center">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleModal" onclick=setDetails('${item._id}')>
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
            card.appendChild(div);
        }
    } else {
        div.innerHTML = `
        <div class="found-item py-4 text-center" >
            <h5>No Data Found</h5>
        </div>
        `;
        dataNotFound.appendChild(div);
    }

}

const getDetails = async (id) => {
    try {
        const response = await fetch(' https://openapi.programming-hero.com/api/news/' + id)
        const myJson = await response.json();
        return myJson.data[0];
    } catch (error) {
        console.log(error);
    }

}

const setDetails = async (id) => {
    console.log(id);
    const data = await getDetails(id);
    const card = document.getElementById("modal-body");
    card.textContent = '';
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="row g-0 p-3 align-items-center">
                      <div class="col-md-12 mb-3">
                        <img src=${data.image_url} alt="..." class = "img-fluid">
                      </div>
                      <div class="col-md-12">
                        <h5>${data.title}</h5>
                        <p class="card-text">${data.details}</p>
                        <p class="card-text pb-4">News Rating:<b> ${data.rating.number}</b></p>
                        <div class="row">
                        <div class="col-6 d-flex align-items-center">
                            <img src=${data.author.img} class="author-img me-2" alt="">
                            <div class="author-name">
                                <p>${data.author.name != null ? data.author.name : "author name not found"}</p>
                            </div>
                        </div>
                        <div class="col-6 d-flex align-items-center justify-content-end">
                            <p><i class="fa-solid fa-eye eye-icon"></i>${data.total_view != null ? data.total_view :
            "view not found"}</p>
                        </div>
                        
                    </div>
                      </div>
        `
    card.appendChild(div);

}

setAllMenu();
setNews(08);