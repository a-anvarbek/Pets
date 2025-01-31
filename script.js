// Pets project with API

document.addEventListener("DOMContentLoaded", () => {
    const animalSelect = document.getElementById("animalSelect");
    const breedSelect = document.getElementById("breedSelect");
    const submitButton = document.getElementById("submitBtn");
    const resultsContainer = document.querySelector(".containerReturn");

    // Populate animals in dropdown
    async function fetchAnimalsTypes() {
        try {
            const response = await fetch("https://pets-v2.dev-apis.com/animals");
            const data = await response.json();
            return data.animals || [];
        } catch (error) {
            console.error("Error fetching animals:", error);
            return [];
        }
    }

    async function populateAnimals() {
        const animals = await fetchAnimalsTypes();
        animalSelect.innerHTML = '<option value="">Select an animal</option>';
        animals.forEach((animal) => {
            const option = document.createElement("option");
            option.value = animal;
            option.textContent = animal;
            animalSelect.appendChild(option);
        });
    }

    // Fetch breeds when an animal is selected
    animalSelect.addEventListener("change", async () => {
        const animal = animalSelect.value;
        breedSelect.innerHTML = "<option value=''>Select a breed</option>";

        if (animal) {
            try {
                const response = await fetch(`https://pets-v2.dev-apis.com/breeds?animal=${animal}`);
                const data = await response.json();
                
                data.breeds.forEach(breed => {
                    const option = document.createElement("option");
                    option.value = breed;
                    option.textContent = breed;
                    breedSelect.appendChild(option);
                });
            } catch (error) {
                console.error("Error fetching breeds:", error);
            }
        }
    });

    // Fetch pet details on submit
    submitButton.addEventListener("click", async () => {
        const animal = animalSelect.value;
        const breed = breedSelect.value;

        if (!animal) {
            alert("Please select an animal.");
            return;
        }

        try {
            const response = await fetch(`https://pets-v2.dev-apis.com/pets?animal=${animal}&breed=${breed}`);
            const data = await response.json();
            resultsContainer.innerHTML = "";

            data.pets.forEach(pet => {
                const petElement = document.createElement("a");
                petElement.href = `forDetaliasAnimal.html?name=${encodeURIComponent(pet.name)}&breed=${encodeURIComponent(pet.breed)}&animal=${encodeURIComponent(animal)}&city=${encodeURIComponent(pet.city)}&state=${encodeURIComponent(pet.state)}&image=${encodeURIComponent(pet.images[0] || 'https://via.placeholder.com/100')}&description=${encodeURIComponent(pet.description || 'No description available.')}`;
                petElement.classList.add("details");
                petElement.innerHTML = `
                    <div class="img">
                        <img src="${pet.images[0] || 'https://via.placeholder.com/100'}" alt="${pet.name}">
                    </div>
                    <div class="info">
                        <h1>${pet.name}</h1>
                        <h2>${pet.breed}</h2>
                    </div>
                `;
                resultsContainer.appendChild(petElement);
            });
        } catch (error) {
            console.error("Error fetching pets:", error);
            alert("Something went wrong. Please try again.");
        }
    });

    populateAnimals();
});




// const fetchAnimals1 = async (animal) => {
//     const response = await fetch(
//       `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
//     );
//     const data = await response.json();
  
//     console.log(data);
//     return data;
// };
  
// fetchAnimals1("bird");
  
// function fetchAnimals2(animal) {
//     fetch(`https://pets-v2.dev-apis.com/breeds?animal=${animal}`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//       });
// }
  
// fetchAnimals2("cat");   