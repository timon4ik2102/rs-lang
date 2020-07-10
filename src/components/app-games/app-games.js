import React from 'react';
import s from './app-games.module.css'
import {Link} from "react-router-dom";
import Header from '../app-header/app-header';
import Sidebar from '../app-sidebar/app-sidebar';
import SprintImg from '../sprint-game/files/img/sprintPromoBackground.jpg';
import Page from '../app-page-structure/app-page-structure';

function Games() {
    const gameInfo = [
        {image: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', title: 'SpeakIt', text: 'Описание speakIt', path: '/speakit'},
        {image: SprintImg, title: 'Sprint', text: 'Learn how to quickly translate from English into your native language.', path: '/sprint'},
        {image: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', title: 'Savannah', text: 'Описание savannah', path: '/savanna'},        
        {image: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', title: 'Audiocall', text: 'Описание audiocall', path: '/audiocall'},
        {image: SprintImg, title: 'Word Constructor', text: 'Описание audiocall', path: '/constructor'},
        {image: 'https://avatarko.ru/img/kartinka/33/multfilm_lyagushka_32117.jpg', title: 'English-puzzle', text: 'Описание english-puzzle', path: '/english-puzzle/start'},
    ]

    const renderCard = (card, index) => {
        return (
            <div className={s.game_card} key={index}>
                <img style={{ width: '100%', height:'220px' }} className={s.card_img} src={card.image} />
                <div>
                    <div className={s.card_title}>{card.title}</div>
                    <div className={s.card_description}>
                        {card.text}
                    </div>
                    <button className={s.card_button}><Link target='_blank' to={card.path}>Start</Link></button>
                </div>
            </div>
        )
    }

    return (
        <Page>
            {/* <Header/> */}
            <div className={s.game_page}>
                {/* <Sidebar/> */}
                <div className={s.main_content_wrapper}>
                    <div className={s.cards_container}>
                        {gameInfo.map(renderCard)}
                    </div>
                </div>
            </div>
        </Page>

    )
}
export default Games;
