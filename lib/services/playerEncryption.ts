export class PlayerEncryption {

    public encryptPersonalData(players) {
        players.forEach(element => {
            if (element.dsgvo === false || element.dsgvo === undefined) {
                element.name = element.name.substring(0, 1);
                element.prename = element.prename.substring(0, 1);
                element.birthday = null;
                element.picture = null;
                element.socialMedia = {
                    instagram: null,
                    facebook: null,
                    twitter: null,
                    xing: null
                };
            }
        });
        return players;
    }
}