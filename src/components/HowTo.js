import React, { useEffect, useState } from 'react';
import { MdLiveHelp } from 'react-icons/md';
import arrangement_img from '../assets/how to/arrangement.png';
import gameplay_img from '../assets/how to/gameplay.png';
import { FaSkullCrossbones, FaHeart } from 'react-icons/fa';
import { GiCrossMark } from 'react-icons/gi';
import { BsShieldFillX } from 'react-icons/bs';

const HowTo = ({ setEnableOverflow }) => {
    const [toDisplay, setToDisplay] = useState(false);
    useEffect(() => {
        setEnableOverflow(toDisplay);
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toDisplay]);
    return (
        <>
            <MdLiveHelp className='help--ic' onClick={() => { setToDisplay(prev => !prev) }} />
            {toDisplay &&
            <div className='how-to animate__animated animate__fadeIn'>
                <div className='how-to--arrangement'>
                    <h1>Розстановка кораблів</h1>
                    <div className='how-to--wrapper'>
                        <img src={arrangement_img} className='how-to--img arrangement-img' alt='arrangement' />
                        <div className='how-to--content'>
                            <p>
                                Перш за все, необхідно розмістити ваш корабель на дошці. Існують два способи розміщення кораблів.
                            </p>
                            <ul className='center'>
                                <li className='highlight'>Перетягування</li>
                                <li className='highlight'>Випадкове розміщення</li>
                            </ul>
                            <p className='highlight'>
                                Правила розміщення кораблів
                            </p>
                            <ul>
                                <li>Ви можете розмістити свій корабель горизонтально або вертикально. Діагональне розміщення заборонено.</li>
                                <li>Ви не можете розмістити корабель на сусідню клітинку від вже розміщеного корабля.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='how-to--arrangement'>
                    <h1>Гра</h1>
                    <div className='how-to--wrapper'>
                        <div className='how-to--content'>
                            <p>Після початку гри гравець повинен обрати координату, куди він хоче постріляти в дошку супротивника. Далі комп'ютер атакує дошку гравця. Це повторюється, поки всі кораблі не будуть потоплені.</p>
                            <p className='highlight'>Позначки на дошці</p>
                            <ul className='how-to--ic-list'>
                                <li><FaSkullCrossbones className='how-to--ic green' /> - Вказує на частину корабля, яка була поранена.</li>
                                <li><GiCrossMark className='how-to--ic red' /> - Вказує, що ця клітинка не містить корабля.</li>
                                <li><BsShieldFillX className='how-to--ic blue' /> - Вказує на навколишню зону корабля.</li>
                                <li><FaHeart className='how-to--ic red' /> - Вказує на життя корабля.</li>
                            </ul>
                        </div>
                        <img src={gameplay_img} alt='gameplay' className='how-to--img gameplay-img'/>
                    </div>
                </div>
                <p className='rule-link-p'><a className='rule-link' href="https://en.wikipedia.org/wiki/Battleship_(game)" target="_blank" rel="noreferrer">Вікіпедія</a></p>
            </div>
            }
        </>
    );
}

export default HowTo;