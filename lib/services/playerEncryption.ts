export class PlayerEncryption {

    public encryptPersonalData(players) {
        players.forEach(element => {
            element = this.encyptSinglePerson(element);
        });
        return players;
    }

    public encyptSinglePerson(player) {
        if (player.dsgvo === false || player.dsgvo === undefined) {
            player.name = player.name.substring(0, 1);
            player.prename = player.prename.substring(0, 1);
            player.birthday = null;
            player.picture = null;
            player.socialMedia = {
                instagram: null,
                facebook: null,
                twitter: null,
                xing: null
            };
        }
        return player;
    }
}