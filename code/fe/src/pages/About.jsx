import React from 'react';
import { API_URL } from '../constans';

function About() {
  return (
    <div>
      <div className='mainPage d-flex'>
        <div className='mainContent'>
          <div className='about container'>
            <section className='what mt5'>
              <div className=''>
                <h2 className='mb1'>What is Funny App</h2>
                <div className='what__iner'>
                  <img src={`${API_URL}/uploads/what1.jpg`} alt='sbj_icon' className='sbj__icon' />
                  <div className='what__text p2'>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero porro iure
                      illum quasi facilis in cumque vel, ab quia inventore!
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className='why mt5'>
              <h2 className='mb1 '>Why was Funny App created?</h2>
              <div className='why_text'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, qui. Mollitia
                  magnam voluptatum exercitationem earum saepe nisi, nostrum aliquam totam, debitis
                  dolorum molestiae placeat animi cupiditate, in recusandae labore adipisci?
                </p>
              </div>
              <h3 className='accent center mt3'>When is a site useful?</h3>
              <div className='why_wrap d-flex f-wrap jcsb mt2'>
                <div className='why_inner w40 d-flex jcs aic mb2'>
                  <img src={`${API_URL}/uploads/why1.svg`} alt='sbj_icon' className='sbj__icon' />
                  <p>develop logic</p>
                </div>
                <div className='why_inner w40 d-flex jcs aic mb2'>
                  <img src={`${API_URL}/uploads/why2.svg`} alt='sbj_icon' className='sbj__icon' />
                  <p>help with school subjects</p>
                </div>
                <div className='why_inner w40 d-flex jcs aic mb2'>
                  <img src={`${API_URL}/uploads/why3.svg`} alt='sbj_icon' className='sbj__icon' />
                  <p>preparing for the olympiad</p>
                </div>
                <div className='why_inner w40 d-flex jcs aic mb2'>
                  <img src={`${API_URL}/uploads/why4.svg`} alt='sbj_icon' className='sbj__icon' />
                  <p>raise your grades</p>
                </div>
              </div>
            </section>
            <section className='binif mt5 mb5'>
              <h2 className='mb1'>What is the benefit for a child?</h2>
              <div className='bin_text'>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim esse consequatur
                  nulla amet vel laboriosam quibusdam ipsum ea culpa modi!
                </p>
                <div
                  className='bin_items'
                  style={{ backgroundImage: `url(${API_URL}/uploads/bin3.svg)` }}>
                  <div className='d-flex jcc aic f-column'>
                    <div className='bin-items_wrap mt2 mb2'>
                      <div className='bin_item d-flex g1 mb2 aic'>
                        <img
                          src={`${API_URL}/uploads/bin1.svg`}
                          alt='sbj_icon'
                          className='sbj__icon'
                        />
                        <p>Listen to the teacher carefully</p>
                      </div>
                      <div className='bin_item d-flex g1 mb2 aic'>
                        <img
                          src={`${API_URL}/uploads/bin1.svg`}
                          alt='sbj_icon'
                          className='sbj__icon'
                        />
                        <p>Read more and analyze what you read</p>
                      </div>
                      <div className='bin_item d-flex g1 mb2 aic'>
                        <img
                          src={`${API_URL}/uploads/bin1.svg`}
                          alt='sbj_icon'
                          className='sbj__icon'
                        />
                        <p>Make interesting speeches</p>
                      </div>
                      <div className='bin_item d-flex g1 mb2 aic'>
                        <img
                          src={`${API_URL}/uploads/bin1.svg`}
                          alt='sbj_icon'
                          className='sbj__icon'
                        />
                        <p>Discuss and argue your position</p>
                      </div>
                      <div className='bin_item d-flex g1 mb2 aic'>
                        <img
                          src={`${API_URL}/uploads/bin1.svg`}
                          alt='sbj_icon'
                          className='sbj__icon'
                        />
                        <p>Discuss and argue your position</p>
                      </div>
                      <div className='bin_item d-flex g1 mb2 aic'>
                        <img
                          src={`${API_URL}/uploads/bin1.svg`}
                          alt='sbj_icon'
                          className='sbj__icon'
                        />
                        <p>Be more independent and not be afraid to make mistakes</p>
                      </div>
                    </div>
                    <div className='w60 d-flex jcc f-column aic'>
                      <p>
                        We praise and reward children for their achievements! FunnyApp is not only
                        an assistant, but also a true friend.
                      </p>
                      <img src={`${API_URL}/uploads/bin2.svg`} alt='sbj_icon' className='center' />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
