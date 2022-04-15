const imagePickerElement = document.querySelector('#image-upload-control input')
const imageElement = document.querySelector('#image-upload-control img');

function updateImagePreview () {
const files = imagePickerElement.files;

    if (!files || files.length === 0) {
        imageElement.style.display = 'none';
        return;
    }

    const pickedFile = files[0];

    imageElement.src = URL.createObjectURL(pickedFile);
    imageElement.style.display = 'block';

}

imagePickerElement.addEventListener('change', updateImagePreview)