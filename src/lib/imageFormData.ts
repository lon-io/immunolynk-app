export interface Picture {
    width: number;
    height: number;
    uri: string;
    base64?: string;
    exif?: any;
}

export const getImageFormData = (picture: Picture) => {
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = picture.uri;
    let filename = localUri.split('/').pop() || 'File';

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    // @ts-ignore
    formData.append('photo', { uri: localUri, name: filename, type });

    return formData;
}
