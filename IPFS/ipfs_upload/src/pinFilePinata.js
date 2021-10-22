const axios = require("axios");
const FormData = require("form-data");
const PinataJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMjYwZmRmYi1lZmRjLTRmZTktOGYwYi1jZjg4OTExOGFmMjkiLCJlbWFpbCI6InB1bmVldEBwZXJzaXN0ZW5jZS5vbmUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYTAyMWI1MWMzZWVlOGQ2NWU0MjciLCJzY29wZWRLZXlTZWNyZXQiOiJiNzQyMmQ5ZDNhNGQyNzViYmI0M2VhMDU1OTlmNzA2ODgzZTUxNjMyNzcxMjRiYjZlOWM5Yjg2YjBkZDBhNGUyIiwiaWF0IjoxNjM0NjQ5MTg4fQ.i514LU4xYYu95OvuZJ6vhWKgUqmXxnkhMMmDw-GmpCg";

const getApiConfig = async () => {
    const config = {
        headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: `Bearer ${PinataJWT}`,
        }
    };
    return config;
};

export const handleUpload = async (selectedFiles, customName, wrapWithDirectory) => {
    try {
        console.log("Handling Upload",selectedFiles)
        const data = new FormData();
        if (customName && customName !== '') {
            const metadata = JSON.stringify({
                name: customName
            });
            data.append('pinataMetadata', metadata);
        }

        if (selectedFiles.length > 0) {
            selectedFiles.forEach((file) => {
                data.append(`file`, file);
            });
        } else {
            data.append('file', selectedFiles, selectedFiles.name);
        }
        if (wrapWithDirectory === true) {
            const pinataOptions = JSON.stringify({
                wrapWithDirectory: true
            });
            data.append('pinataOptions', pinataOptions);
        }
        const res = await axios.post(`https://api.pinata.cloud/pinning/pinFileToIPFS`, data, await getApiConfig());
        return res.data;
    } catch (error) {
        console.log(error)
        //  Handle error
    }
};


