// Acceptable image format types
const VALIDFORMATS = new Set([
    "image/jpeg", "image/png", "image/webp"
]);

// update the image
function updateImage(file) {
    const imgURL = URL.createObjectURL(file);
    const imgElement = document.querySelector("#uploadedImage");
    imgElement.src = imgURL;
    imgElement.style.display = "block";
}

// Hide the div image holder
function hideImgHolder() {
    const divElement = document.querySelector("#temp-img");
    divElement.style.display = "none";
}



const fileInput = document.querySelector("#imgUpload");

// When the file input changes check the uploaded file to validate the
// file extension
fileInput.addEventListener("change", function(event) {
    const files = event.target.files;

    switch (files.length) {
        case 0:
            console.error("Error, uploaded file not accessible");
            break;
        case 1:
            file = files[0];
            
            if (!VALIDFORMATS.has(file.type))
            {
                // Wrong file type
                alert(`Error from file "${file.name}"\n
                    File type unsupported, upload a file of type: ".jpg.", ".png" or ".webp"`);
                console.error(`Error: File type unsupported. Please upload a file of type ".jpg.", ".png" or ".webp"`);
                break;
            }

            console.log(file.name);
            // Update the image once it has been validated
            updateImage(file);
            hideImgHolder();
            break;
        default:
            console.error("Error: More than one file selected! Please only select one file.");
    }
        
});


// window.onload = function() {


    

// }