// For details
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const name = params.get("name") || "Unknown";
    const breed = params.get("breed") || "Unknown";
    const animal = params.get("animal") || "Unknown";
    const city = params.get("city") || "Unknown";
    const state = params.get("state") || "Unknown";
    const image = params.get("image") || "https://via.placeholder.com/200";
    const description = params.get("description") || "No description available.";

    document.getElementById("animal-name").textContent = name;
    document.getElementById("animal-image").src = image;
    document.getElementById("animal-info").textContent = `${animal} - ${breed}`;
    document.getElementById("animal-location").textContent = `Location: ${city}, ${state}`;
    document.getElementById("animal-description").textContent = `Description: ${description}`;
});
