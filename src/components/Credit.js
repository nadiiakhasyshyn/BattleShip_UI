import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineTrophy, AiFillCrown, AiFillTrophy } from 'react-icons/ai';

const Credit = ({ setEnableOverflow }) => {
    const [toDisplay, setToDisplay] = useState(false);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        setEnableOverflow(toDisplay);

        if (toDisplay) {
            axios.get('https://myseabattle.onrender.com/api/player')
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [toDisplay, setEnableOverflow]);

    const fetchData = () => {
        axios.get('https://myseabattle.onrender.com/api/player')
            .then(response => {
                const sortedData = response.data.sort((a, b) => b.victories - a.victories);
                setUserData(sortedData);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        if (toDisplay) {
            fetchData();
        }
    }, [toDisplay]);

    return (
        <>
            <AiOutlineTrophy title='Результати гравців'  className='credit-btn' onClick={() => { setToDisplay(prev => !prev) }} />
            {toDisplay && (
                <div className='credit animate__animated animate__fadeIn'>
                    <table className='credit-table'>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Ім'я користувача</th>
                            <th>Кількість перемог</th>
                            <th>Кількість поразок</th>
                            <th>Всього ігор</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userData.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>
                                    {user.name}
                                    {index === 0 && <AiFillCrown className='gold-icon' />}
                                    {index === 1 && <AiFillTrophy className='silver-icon' />}
                                    {index === 2 && <AiFillTrophy className='bronze-icon' />}
                                </td>
                                <td>{user.victories}</td>
                                <td>{user.losses}</td>
                                <td>{user.totalGames}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default Credit;
