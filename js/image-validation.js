// Acceptable image format types
const validFormat = new Set([
    "image/jpeg", "image/png", "image/webp"
]);

// verify the file type



const fileInput = document.getElementById("imgUpload");

// When the file input changes check the uploaded file to validate the
// file extension
fileInput.addEventListener("change", function(event) {
    const files = event.target.files;

    switch (files.length) {
        case 0:
            console.error("Error, uploaded file not accessible");
            break;
        case 1:
            const file = files[0];
            
            if (!validFormat.has(file.type))
            {
                // Wrong file type
                alert(`Error from file "${file.name}"\n
                    File type unsupported, upload a file of type: ".jpg.", ".png" or ".webp"`);
                console.error(`Error: File type unsupported. Please upload a file of type ".jpg.", ".png" or ".webp"`);
                break;
            }

            console.log(file.name);
            break;
        default:
            console.error("Error: More than one file selected! Please only select one file.");
    }

    
});


// window.onload = function() {


    

// }