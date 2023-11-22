// import images from "./data.js"

const apiKey = "40712154-08ce4dcac58c3112602f88d10";
const apiUrl = "https://pixabay.com/api/"

async function fetchData() {

    const query = "elephants"; // For example, searching for images of elephants

    try {
        const response = await fetch(`${apiUrl}?key=${apiKey}&q=${query}`);
        const data = await response.json();

        if (response.ok) {
            // Success (Good Response)
            return generateCards(data.hits);
            

        } else {
            // Failure (Bad Response)
            console.error("Bad Response");
        }
    } catch (error) {
        //Failure (Network error, etc.)
        console.error("An Error occured");
    }
}


function generateCards(images) {
    const container = document.querySelector('[data-js="api-data"]');
    container.innerHTML = ""; // Clear previous content

    images.forEach(function(image) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "30em";
        card.style.margin = "3em";
        container.append(card);

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.setAttribute("src", image.webformatURL);
        img.setAttribute("alt", image.tags);
        img.setAttribute("title", image.tags);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        card.append(img, cardBody);

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.style.fontSize = "1.5rem";
        cardTitle.style.textTransform = "capitalize";
        cardTitle.textContent = image.type
        
        const views = document.createElement("p");
        views.classList.add("card-text");
        views.textContent = `${image.views} views`;
        cardBody.append(cardTitle, views)

        const tags = document.createElement("p");
        tags.classList.add("card-text");
        tags.style.textTransform = "capitalize";
        tags.textContent = `Tags: ${image.tags}`;
        cardBody.append(tags)
        
    });
}

fetchData();