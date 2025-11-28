class PlayerState {
    #name = '';
    #age = 0;
    #money = 0;

    static getInstance() {
        if (!PlayerState.instance) {
            PlayerState.instance = new PlayerState();
        }
        return PlayerState.instance;
    }
}

export const playerState = PlayerState.getInstance();
