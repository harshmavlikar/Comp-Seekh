import React from 'react';
import './Info.css';
import about_img from '../../assets/about.png';
import play_icon from '../../assets/play-icon.png';

const Info = () => {
    return (
        <div className='about' id='info'>
            <div className="about-left">
                <img src={about_img} alt="About Us" className='about-img'/>
            </div>
            <div className="about-right">
                <h1>About Us</h1>
                <h3>Our Mission</h3>
                <h2>To develop capable users of Information Technology who will effectively and creatively use the most amazing machine – a PC!</h2>
                <p>We offer customized workshops to empower users, tailored to the individual needs of students, teachers, professionals, homemakers, and senior citizens.</p>
                <p><strong>Maharashtra State Certificate in Information Technology (MS-CIT):</strong> As an Authorized Learning Centre of Maharashtra Knowledge Corporation (MKCL), we offer MS-CIT to make participants proficient in Word, Excel, PowerPoint, and Internet through practical case studies.</p>
                <p><strong>Diploma in Advanced Computing (DAC):</strong> As an Authorized Training Centre of CDAC’s Advanced Computing Training School, we offer DAC. CDAC, an initiative of the Ministry of IT, Government of India, selects B.E and B.Tech graduates through an All India Common Admission Test for this PG Diploma.</p>
                <div className="achievements">
                    <h3>Achievements</h3>
                    <ul>
                        <li>Over 10,000 successful MS-CIT graduates.</li>
                        <li>Recognized as a top training center by CDAC.</li>
                        <li>Custom workshops attended by over 5,000 professionals annually.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Info;
