import React, { useState } from 'react';
import './Courses.css';
import program_icon_1 from '../../assets/program-icon-1.png';
import program_icon_2 from '../../assets/program-icon-2.png';
import program_icon_3 from '../../assets/program-icon-3.png';
import daclogo from '../../assets/daclogo.jpg';
import mscit from '../../assets/logo5.jpg';
import dbms from '../../assets/dbms.png';

const courseDescriptions = {
    dac: "Post Graduate Diploma in Advanced Computing (PG-DAC) is the flagship programme of the Centre for Development of Advanced Computing (C-DAC). This course equips students with the skills necessary for a career in the IT industry.",
    mscit: "Maharashtra State Certificate in Information Technology (MS-CIT) is an IT literacy course started by MKCL (Maharashtra Knowledge Corporation Limited) in 2002. This course is designed to impart IT knowledge to common people.",
    dbda: "PG Diploma in Big Data Analytics (PG-DBDA) provides a comprehensive understanding of big data technologies, data management, and analytics techniques necessary for handling massive datasets."
};

const Courses = () => {
    const [activeCourse, setActiveCourse] = useState(null);

    const toggleDescription = (course) => {
        setActiveCourse(activeCourse === course ? null : course);
    };

    return (
        <div className='courses'>
            <div className="course" onClick={() => toggleDescription('dac')}>
                <img src={daclogo} alt="DAC Course" />
                <div className="caption">
                    <img src={program_icon_1} alt="DAC Icon" />
                    <p>Post Graduate Diploma In Advanced Computing</p>
                </div>
                {activeCourse === 'dac' && <p className="description">{courseDescriptions.dac}</p>}
            </div>
            <div className="course" onClick={() => toggleDescription('mscit')}>
                <img src={mscit} alt="MS-CIT Course" />
                <div className="caption">
                    <img src={program_icon_2} alt="MS-CIT Icon" />
                    <p>Maharashtra State Certificate in Information Technology (MS-CIT)</p>
                </div>
                {activeCourse === 'mscit' && <p className="description">{courseDescriptions.mscit}</p>}
            </div>
            <div className="course" onClick={() => toggleDescription('dbda')}>
                <img src={dbms} alt="DBDA Course" />
                <div className="caption">
                    <img src={program_icon_3} alt="DBDA Icon" />
                    <p>PG Diploma in Big Data Analytics (PG-DBDA)</p>
                </div>
                {activeCourse === 'dbda' && <p className="description">{courseDescriptions.dbda}</p>}
            </div>
        </div>
    );
};

export default Courses;
