import React, { useEffect, useReducer, useState } from 'react';
import { ACTIONS, reducer } from './reducer';
import OpponentBoard from './OpponentBoard';
import PlayerBoard from './PlayerBoard';
import Ships from './Ships';
import Menu from '../menu/Menu';
import GameOver from './GameOver';
import HowTo from '../HowTo';
import Credit from '../Credit';

export const gameDataContext = React.createContext(null);

const Game = () => {
    const [gameData, dispatch] = useReducer(reducer, false);

    const [enableOverflow, setEnableOverflow] = useState(true);

    useEffect(() => {
        const html = document.querySelector('html');
        enableOverflow ? html.classList.add('no-overflow') : html.classList.remove('no-overflow');
    }, [enableOverflow]);

    useEffect(() => {
        dispatch({ type: ACTIONS.SET_INITIAL });
    }, []);

    useEffect(() => {
        if (gameData.currentPlayer === 'player_1' || gameData.playerWon !== '') return;
        setTimeout(() => {
            dispatch({ type: ACTIONS.RANDOM_ATTACK });
        }, 300);
    }, [gameData.currentPlayer]);


    const updateStats = (victories, losses, totalGames) => {
        dispatch({
            type: ACTIONS.UPDATE_STATS,
            payload: {
                victories,
                losses,
                totalGames,
            },
        });
    };


    return (
        <gameDataContext.Provider value={[gameData, dispatch, updateStats]}>
            {gameData && (
                <div className="game" data-status={gameData.isGameStarted}>
                    {!gameData.isGameStarted && <Menu />}
                    {gameData.isGameStarted ? (
                        <PlayerBoard />
                    ) : (
                        <div className="game-menu-board">
                            <PlayerBoard />
                            {!gameData.isGameStarted && <Ships />}
                        </div>
                    )}
                    {gameData.isGameStarted && <OpponentBoard currentPlayer={gameData.currentPlayer} />}
                </div>
            )}
            {gameData && gameData.playerWon !== '' && <GameOver />}
            <div className="stats">
                <div>Victories: {gameData.victories || 0}</div>
                <div>Defeats: {gameData.losses || 0}</div>
                <div>Total Games: {gameData.totalGames || 0}</div>
            </div>
            <HowTo setEnableOverflow={setEnableOverflow} />
            <Credit setEnableOverflow={setEnableOverflow} />
        </gameDataContext.Provider>
    );
};

export default Game;
