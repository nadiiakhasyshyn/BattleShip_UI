import React, { useContext } from 'react';
import { gameDataContext } from './Game';
import { ACTIONS } from './reducer';

const GameOver = () => {
    const [gameData, dispatch] = useContext(gameDataContext);
    const resetGame = () => {
        dispatch({type: ACTIONS.SET_INITIAL});
    }
    const restartGame = () => {
        dispatch({type: ACTIONS.SET_INITIAL});
        dispatch({type: ACTIONS.GENERATE_BOARD});
        dispatch({type: ACTIONS.START_GAME});
    }
    return (
        <>
            <div className='hide'> </div>
            <div className='gameover animate__animated animate__fadeIn'>
                <h1>Гра закінчена</h1>
                <h1>Гравець {gameData.playerWon} переміг</h1>
                <div className='gameover--options'>
                    <div className='gameover--option' onClick={restartGame}>Нова гра</div>
                    <div className='gameover--option' onClick={resetGame}>Головне меню</div>
                </div>
            </div>
        </>
    )
}

export default GameOver;
