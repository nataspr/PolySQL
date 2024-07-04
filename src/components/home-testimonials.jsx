import React, { useState } from 'react';

const HomeTestimonials = () => {
    const [activePerson, setActivePerson] = useState(0);

    const people = [
        {
            text: "Мы постарались собрать самые нужные и полезные материалы, изученные нами при прохождении курса разработки баз данных PostgreSQL. Можно с уверенностью сказать, что данный сайт поможет изучить даже самые сложные темы, решая тесты и практические задачи.",
            name: "Анастасия Алексеевна Лихачева",
            position: "Разработчик клиентской части",
            imgSrc: "https://sun9-70.userapi.com/impg/CJIJGXF2jVuvX9eEh3U1hkSItSX-aARfL4ZHpA/ThAAqaXREmU.jpg?size=673x673&quality=95&sign=83f9d61900a23b2e4b80616717934094&type=album"
        },
        {
            text: "Дорогие студенты, я и моя коллега вложили в этот сайт всю душу, слёзы, сон. Надеемся, что вы будете использовать этот сайт хотя бы чтоб увековечить нашу память. А также моё пожелание на будущее (совет от старших поколений): не делать практику за полторы суток до сдачи.",
            name: "Наталия Денисовна Спиридонова",
            position: "Главный специалист по серверной части",
            imgSrc: "https://sun9-35.userapi.com/impg/z4lZnm22Ch10akJ6QWcpNVEn-PxioSUSh5mVDw/EXHFlcptfPw.jpg?size=2333x2333&quality=95&sign=d6a9f39daaa3467d611a1887becb855a&type=album"
        },
        {
            text: "Take up one idea. Make that one idea your life - think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success. A single rose can be my garden... a single friend, my world.",
            name: "Екатерина Евгеньевна Андрианова",
            position: "Ст. преподаватель, СПбПУ",
            imgSrc: "https://sh1-ningash-r04.gosweb.gosuslugi.ru/netcat_files/9/148/stndavatarwooman_1.jpg"
        }
    ];

    return (
        <section className="home-testimonials">
            <div className="home-container11">
                <div className="home-container12">
                    <div className="home-container13">
                        <h2 className="home-text35 HeadingOne">Учитесь с нами</h2>
                        <p className="home-text36 Lead">
                            Мы ждём Вас с любым уровнем знаний!
                        </p>
                        <p className="home-text37 Body">{people[activePerson].text}</p>
                        <p className="home-text38">{people[activePerson].name}</p>
                        <p className="home-text39 Small">{people[activePerson].position}</p>

                        <div className="home-container14">
                            {people.map((person, index) => (
                                <img
                                    key={index}
                                    alt="image"
                                    src={person.imgSrc}
                                    className={`home-image0${index + 4} ${activePerson === index ? 'active' : ''}`}
                                    onClick={() => setActivePerson(index)}
                                    style={{filter: activePerson === index ? 'brightness(1)' : 'brightness(0.8)'}}
                                />
                            ))}
                        </div>
                    </div>
                </div>


                <div className="home-logos">
                    <div className="home-container17">
                        <div className="home-container18">
                            <div className="home-container19">
                                <img src="https://www.sheremetev.info/wp-content/uploads/2020/04/mysql_png23.png"
                                     className="home-image-logo"/>
                            </div>
                            <div className="home-container20">
                                <img src="https://www.anti-malware.ru/files/images/company-logo/oracle_logo.jpg"
                                     className="home-image-logo"/>
                            </div>
                            <div className="home-container21">
                                <img
                                    src="https://db-service.ru/uploads/s/b/f/v/bfvt1aldvf1l/img/autocrop/a7f780e7831e43bfc5689cf492a960ac.png"
                                    className="home-image-logo"/>
                            </div>
                        </div>
                        <div className="home-container22">
                            <div className="home-container23">
                                <img
                                    src="https://w7.pngwing.com/pngs/63/19/png-transparent-mongodb-database-nosql-postgresql-mongo-text-logo-business.png"
                                    className="home-image-logo2"/>
                            </div>
                            <div className="home-container24">
                                <img src="https://w7.pngwing.com/pngs/330/298/png-transparent-postgresql-hd-logo.png"
                                     className="home-image-logo"/>
                            </div>
                            <div className="home-container25">
                                <img src="https://i.pinimg.com/originals/0b/ba/6d/0bba6dbc8bcb42b7e37fc6831f9274dd.png"
                                     className="home-image12"/>
                            </div>
                        </div>
                        <div className="home-container26">
                            <div className="home-container27">
                                <img src="https://w7.pngwing.com/pngs/230/99/png-transparent-redis-original-wordmark-logo-icon.png"
                                    className="home-image-logo"/>
                            </div>
                            <div className="home-container28">
                                <img src="https://kursus-komputer.net/wp-content/uploads/2019/11/belajar-firebase-300x225.png"
                                    className="home-image-logo2"/>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    alt="image"
                    src="/bottom.svg"
                    loading="lazy"
                    className="home-bottom-wave-image"
                />
                <img alt="image" src="/waves-white.svg" className="home-image15"/>
                <img alt="image" src="/top.svg" className="home-top-wave-image"/>
            </div>
        </section>
    )
}

export default HomeTestimonials;