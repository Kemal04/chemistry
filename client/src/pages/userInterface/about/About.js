import React from 'react'
import { Link } from 'react-router-dom'
import card_1 from '../../../assets/cards/card_2.jpg'
import card_2 from '../../../assets/cards/card_1.jpg'

const About = () => {
    return (
        <>
            <div className='home-bg-mini d-flex align-items-center pt-5'>
                <div className='container'>
                    <div className='row justify-content-center text-center'>
                        <div className='col-xl-12 text-white'>
                            <div className='h1 fw-normal'>Biz Barada</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container my-5'>
                <div className='row align-items-center'>
                    <div className='col-xl-6'>
                        <img src={card_1} alt="" className='img-fluid rounded-5' />
                    </div>
                    <div className='col-xl-6'>
                        <div className='h3 mb-5' style={{ lineHeight: "1.5" }}>
                            Web sahypanyň “Garabogaz köl önümçiliginiň ösüşiniň geljegi”. Önümçilikde magniý gidroksidiniň alnyşy taslamasyny  sanlaşdyrmagyň artykmaçlygy.
                        </div>
                        <p style={{ textAlign: "justify", lineHeight: "1.8", fontSize: "18px" }}>
                            “Türkmenistanyň Prezidentiniň ýurdumyzy 2019-2025-nji ýyllarda durmuş-ykdysady taýdan ösdürmegiň Maksatnamasynda”  halkara ülňülere laýyk gelýän döwrebap maglumat aragatnaşyk tehnologiýalaryna esaslanýan sanly ykdysadyýeti yzygiderli ornaşdyrmagyň hasabyna milli ykdysadyýetimiziň bäsdeşlige ukyplylygyny ýokarlandyrmak boýunça giň gerimli çäreler göz öňünde tutulandyr.Ýurdumyzda sanly ykdysadyýeti ornaşdyrmak we ony ösdürmek bilen bagly wezipeler tapgyrma-tapgyr durmuşa ornaşdyrylýar.
                            Ýurdumyz halkara internet toruna giňden aralaşyp, sanly ulgamyň çäksiz mümkinçiliklerinden ýerlikli hem-de netijeli peýdalanylmaga giň gerim berildi. Ýurdumyzyň ministrlikleri, pudaklaýyn edaralary, eýeçiliginiň görnüşine gara-mazdan, edaralar, kärhanalar, guramalar hem-de hususy telekeçiler özleriniň ýöri-te web-saýtlaryny döredip, maglumat toruna işjeň goşulýarlar. Bu hem ähli ugur-lardaky işleriň netijeli we çalt amala aşyrylmagyna mümkinçilik berýär. Kagyz dolanyşygy aradan aýrylyp, elektron dolanyşyk arkaly işleriň göwnejaý hem-de talabalaýyk derejede çalt depginlerde durmuşa ornaşmagyna ähli şertler döredilýär
                        </p>
                    </div>
                </div>
            </div>

            <div className='about-bg-fixed d-flex align-items-center text-white'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-xl-9 text-center' style={{ lineHeight: "1.8", fontSize: "18px" }}>
                            Milli Liderimiziň
                            Ýolbaşçylygynda halkymyzyň bagtyýar durmuşyny
                            üpjün etmäge berkarar Watany-myzyň abadançylygyna gönükdirilen
                            giň gerimli işler üstünlikli alnyp barylýar.
                            “Türkmenistanda 2019-2025-nji ýyllarda sanly
                            Ykdysadyýeti ösdürmegiň Konsepsiýasynyň” maksatlaryna we wezipelerine laýyklykda utgaşdyrylyp taýýarlanylan
                            “Türkmenistanda himiýa ylmyny we tehnologiýalaryny toplumlaýyn ösdürmegiň 2021-2025-nji ýyllar üçin Döwlet maksatnamasy”
                            döwlet edaralaryny sanly ulgama geçirmegiň depginini güýçlendirmek geljegi uly ugurlaryň hatarynda görkezilýär.
                        </div>
                    </div>
                </div>
            </div>

            <div className='container my-5'>
                <div className='row'>
                    <div className='col-xl-4'>
                        <Link className="card rounded-0 border-0 shadow mx-2 text-decoration-none text-dark h-100" to="">
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <img src={card_2} alt="surat" className="card-img-top px-3" />
                            </div>
                            <div className="card-body">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <h5>Ýurdumyzyň ministrlikleri, pudaklaýyn edaralary...</h5>
                                </div>
                                <p>Ýurdumyzyň ministrlikleri, pudaklaýyn edaralary, eýeçiliginiň görnüşine gara-mazdan, edaralar, kärhanalar, guramalar hem-de hususy telekeçiler özleriniň ýöri-te web-saýtlaryny döredip, maglumat toruna işjeň goşulýarlar.</p>
                            </div>
                        </Link>
                    </div>
                    <div className='col-xl-4'>
                        <Link className="card rounded-0 border-0 shadow mx-2 text-decoration-none text-dark h-100" to="">
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <img src={card_2} alt="surat" className="card-img-top px-3" />
                            </div>
                            <div className="card-body">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <h5>Ýurdumyzyň ministrlikleri, pudaklaýyn edaralary...</h5>
                                </div>
                                <p>Ýurdumyzyň ministrlikleri, pudaklaýyn edaralary, eýeçiliginiň görnüşine gara-mazdan, edaralar, kärhanalar, guramalar hem-de hususy telekeçiler özleriniň ýöri-te web-saýtlaryny döredip, maglumat toruna işjeň goşulýarlar.</p>
                            </div>
                        </Link>
                    </div>
                    <div className='col-xl-4'>
                        <Link className="card rounded-0 border-0 shadow mx-2 text-decoration-none text-dark h-100" to="">
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <img src={card_2} alt="surat" className="card-img-top px-3" />
                            </div>
                            <div className="card-body">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <h5>Ýurdumyzyň ministrlikleri, pudaklaýyn edaralary...</h5>
                                </div>
                                <p>Ýurdumyzyň ministrlikleri, pudaklaýyn edaralary, eýeçiliginiň görnüşine gara-mazdan, edaralar, kärhanalar, guramalar hem-de hususy telekeçiler özleriniň ýöri-te web-saýtlaryny döredip, maglumat toruna işjeň goşulýarlar.</p>
                            </div>
                        </Link>
                    </div>
                </div >
            </div >
        </>
    )
}

export default About