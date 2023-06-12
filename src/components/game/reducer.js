import { Players } from '../../game_logic/Players';

export let players;

const setPlayers = () => {
    players = Players();
};

export const ACTIONS = {
    SET_INITIAL: 'set_initial',
    ADD_SHIP: 'add_ship',
    ROTATE_SHIP: 'rotate_ship',
    GENERATE_BOARD: 'generate_board',
    START_GAME: 'start_game',
    ATTACK: 'attack',
    RANDOM_ATTACK: 'random_attack',
    UPDATE_STATS: 'update_stats'
};

export function reducer(state, action) {
    let newState;
    switch (action.type) {
        case ACTIONS.SET_INITIAL:
            setPlayers();
            const INITIAL_VALUE = {
                board: players.player_1.getGameBoard(),
                hitData: {},
                playerHitData: {},
                shipData: {},
                isGameStarted: false,
                playerWon: '',
                currentPlayer: players.getCurrentPlayer(),
                victories: state.victories || 0,
                losses: state.losses || 0,
                totalGames: state.totalGames || 0,
            };
            return { ...INITIAL_VALUE };

        case ACTIONS.ADD_SHIP:
            players.player_1.assignShipCoordinates(action.payload.length, action.payload.orientation, action.payload.coordinate, action.payload.shipName);
            newState = { ...state };
            newState.board = players.player_1.getGameBoard();
            return { ...newState };

        case ACTIONS.ROTATE_SHIP:
            players.player_1.removeShip(action.payload.shipName);
            if (!players.player_1.placeShip(action.payload.length, action.payload.toggleOrientation, action.payload.coordinate)) {
                players.player_1.assignShipCoordinates(action.payload.length, action.payload.currentOrientation, action.payload.coordinate, action.payload.shipName);
                return state;
            } else {
                players.player_1.assignShipCoordinates(action.payload.length, action.payload.toggleOrientation, action.payload.coordinate, action.payload.shipName);
            }
            newState = { ...state };
            newState.board = players.player_1.getGameBoard();
            return { ...newState };

        case ACTIONS.GENERATE_BOARD:
            newState = { ...state };
            players.player_1.generateBoard();
            newState.board = players.player_1.getGameBoard();
            return { ...newState };

        case ACTIONS.START_GAME:
            if (!players.player_1.getIsAllShipPlaced()) {
                return state;
            }
            newState = { ...state };
            players.player_2.generateBoard();
            newState.shipData = players.createShipLifeData();
            newState.isGameStarted = true;
            return { ...newState };

        case ACTIONS.ATTACK:
            newState = { ...state };
            const [hitData, hitShip] = players.player_2.attack(action.payload.row, action.payload.column);
            newState.hitData = { ...newState.hitData, ...hitData };
            newState.shipData = hitShip ? players.updateShipLife(hitShip.shipName) : newState.shipData;
            if (players.checkIsGameOver()) {
                newState.playerWon = localStorage.getItem('playerName');
                newState.victories = (newState.victories || 0) + 1;
                newState.totalGames = (newState.totalGames || 0) + 1;
            }
            newState.currentPlayer = players.changeTurn();
            return { ...newState };

        case ACTIONS.RANDOM_ATTACK:
            newState = { ...state };
            newState.currentPlayer = 'player_1';
            players.computerAttack();
            newState.board = players.player_1.getGameBoard();
            newState.shipData = players.getPlayersLife();
            if (players.checkIsGameOver()) {
                newState.playerWon = 'Battle AI';
                newState.losses = (newState.losses || 0) + 1;
                newState.totalGames = (newState.totalGames || 0) + 1;
            }
            newState.currentPlayer = players.changeTurn();
            return { ...newState };

        case ACTIONS.UPDATE_STATS:
            newState = { ...state };
            newState.victories = action.payload.victories;
            newState.losses = action.payload.losses;
            newState.totalGames = action.payload.totalGames;

            localStorage.setItem('victories', action.payload.victories);
            localStorage.setItem('losses', action.payload.losses);
            localStorage.setItem('totalGames', action.payload.totalGames);

            return { ...newState };


        default:
            throw new Error();
    }
}

