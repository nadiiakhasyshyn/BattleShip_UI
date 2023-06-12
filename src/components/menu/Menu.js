import React, { useContext, useEffect, useRef, useState } from 'react';
import { GiSwordsEmblem } from 'react-icons/gi';
import { FaRandom, FaEdit } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import { gameDataContext } from '../game/Game';
import { ACTIONS } from '../game/reducer';
import axios from 'axios';

const Menu = () => {
    const [gameData, gameDataDispatch, updateStats] = useContext(gameDataContext);
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(localStorage.getItem('playerName') || 'Player');
    const nameRef = useRef(null);
    const changeFocusRef = useRef(null);

    useEffect(() => {
        checkUserExists(); // Виклик функції checkUserExists при монтажі компонента

        if (!isEditing) {
            const newName = playerName.split(' ').join().length === 0 ? 'Player' : playerName.split(' ').join('');
            setPlayerName(newName);
            nameRef.current.blur();
            localStorage.setItem('playerName', newName);
            return;
        }
        nameRef.current.focus();
    }, []); // Порожній масив залежностей для запуску ефекту тільки під час монтажу

    const generateRandomBoard = () => {
        gameDataDispatch({ type: ACTIONS.GENERATE_BOARD });
        const shipGroups = document.querySelectorAll(".game-ships--group");
        let time = 0;
        shipGroups.forEach(shipElement => {
            setTimeout(() => {
                shipElement.classList.add("animate_animated", "animate__bounceOut");
            }, time);
            time += 70;
        });
    };



    const startGame = () => {
        gameDataDispatch({ type: ACTIONS.START_GAME });
    };

    const changeName = (e) => {
        if (e.target.value.length > 8) return;
        const newPlayerName = e.target.value;
        setPlayerName(newPlayerName);

        if (newPlayerName === localStorage.getItem('playerName')) {
            updateStats(
                parseInt(localStorage.getItem('victories')) || 0,
                parseInt(localStorage.getItem('losses')) || 0,
                parseInt(localStorage.getItem('totalGames')) || 0
            );
        } else {
            localStorage.setItem('playerName', newPlayerName);
            updateStats(0, 0, 0);
        }
    };

    const toggleEditable = (e) => {
        e.preventDefault();
        setIsEditing(prev => !prev);
    };
    const checkUserExists = () => {
        setTimeout(() => {
            axios.get(`https://myseabattle.onrender.com/api/player/name/${playerName}`)
                .then(response => {
                    if (response.data.length > 0) {
                        updateUserStats();
                    } else {
                        updateUserStats();
                    }
                })
                .catch(error => {
                    console.error(error);
                    saveUserData(); // Виклик функції saveUserData незалежно від помилки
                });
        }, 5000); // Затримка в 1000 мс (1 секунда)
    };


    const updateUserStats = () => {
        const userData = {
            name: playerName,
            victories: gameData.victories,
            losses: gameData.losses,
            totalGames: gameData.totalGames
        };

        axios.put(`https://myseabattle.onrender.com/api/player/name/${playerName}`, userData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const saveUserData = () => {
        const userData = {
            name: playerName,
            victories: gameData.victories,
            losses: gameData.losses,
            totalGames: gameData.totalGames
        };

        axios.post('https://myseabattle.onrender.com/api/player', userData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className='game-menu' ref={changeFocusRef}>
            <div className='player_name'>
                <h1 className='player_name--greeting'>Привіт,</h1>
                <form onSubmit={toggleEditable}>
                    <input
                        type='text'
                        value={playerName}
                        onClick={() => { if (!isEditing) { nameRef.current.blur() } }}
                        readOnly={!isEditing}
                        className='player_name--value'
                        ref={nameRef}
                        onChange={changeName}
                    />
                </form>
                {isEditing ? <TiTick className='player_name--ic' onClick={toggleEditable} /> : <FaEdit className='player_name--ic' onClick={toggleEditable} />}
            </div>
            <div className='game-menu--option' onClick={startGame}><GiSwordsEmblem className="game-menu--option-ic" />ПОЧАТИ ГРУ</div>
            <div className='game-menu--option' onClick={generateRandomBoard}><FaRandom className="game-menu--option-ic" />ВИПАДКОВЕ РОЗМІЩЕННЯ</div>
            <div className='game-menu--option' onClick={checkUserExists}>ЗБЕРЕГТИ КОРИСТУВАЧА</div>
        </div>
    );
};

export default Menu;
