import CryptoJS from 'crypto-js';

class logsDAL {

    // Read
    readData = async () => {
        const response = await fetch("https://avans.duckdns.org:1880/uids");
        const result = await response.json();
        return result;
    };

    create = async (log) => {
        const salt = log.picture.substring(0, 16);

        const hashedPicture = CryptoJS.SHA256(log.picture + salt).toString(CryptoJS.enc.Hex);

        const response = await fetch("https://avans.duckdns.org:1880/log", {
            method: "POST",
            body: JSON.stringify({
                username: log.nickname,
                action: "Login poging", //type
                picture: hashedPicture,
            })
        });
        console.log(response);
    }
}

export default logsDAL;
