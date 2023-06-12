import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineCreditCard } from 'react-icons/md';

const Credit = ({ setEnableOverflow }) => {
    const [toDisplay, setToDisplay] = useState(false);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        setEnableOverflow(toDisplay);

        if (toDisplay) {
            axios.get('http://localhost:8080/api/player')
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [toDisplay, setEnableOverflow]);

    const fetchData = () => {
        axios.get('http://localhost:8080/api/player')
            .then(response => {
                setUserData(response.data);
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
            <MdOutlineCreditCard className='credit-btn' onClick={() => { setToDisplay(prev => !prev) }} />
            {toDisplay && (
                <div className='credit animate__animated animate__fadeIn'>
                    <table className='credit-table'>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Name</th>
                            <th>Victories</th>
                            <th>Losses</th>
                            <th>Total Games</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userData.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
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
