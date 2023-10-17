import React from 'react';

const BasicResult = (props) => {
    const { disorders, disorderpages } = props;

    return (
        <div style={{ overflow: 'hidden' }}>
            <div className="resultBanner" style={{ padding: '20px', minHeight: '450px' }}>
                <div className="container">
                    <div style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                        <br />
                        <h1 className="makeCenter">Basic Test Result</h1>
                        <div className="row">
                            <h3 className="makeCenter">You Have a Possibility of Having</h3>
                            <div className="container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <ul>
                                    {disorders &&
                                        disorders.map((disorder, index) => (
                                            <a href={disorderpages[index]} key={index}>
                                                <h2>
                                                    <li>
                                                        <i className="fa fa-snowflake-o" aria-hidden="true"></i>&nbsp;&nbsp;{disorder}
                                                    </li>
                                                </h2>
                                            </a>
                                        ))}
                                </ul>
                            </div>
                            <br />
                            <p className="makeCenter">
                                If you are interested in evaluating yourself for the above disorders, click the disorder name to go to the relevant page
                            </p>
                            <div className="container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <a href="professionals.jsp">
                                    <button className="btn viewPro">View Professionals</button>
                                </a>
                            </div>
                            <br /><br />
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </div>
    );
};

export default BasicResult;
