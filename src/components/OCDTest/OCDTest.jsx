import React, { useState } from 'react';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { Box, Container, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import SecondaryButton from "../secondary-button/SecondaryButton";
import aboutUsImg from "../../assets/main/about-us-img.svg";
import { Margin } from "@mui/icons-material";
import { fontSize, padding } from "@mui/system";


const OCDTest = () => {

    return (
        <Container
            disableGutters
            maxWidth="lg"
            sx={{
                px: {
                    xs: 2,
                    sm: 5,
                    md: 3.5,
                },
                my: 15,
            }}
        >
            <Box>
                <Typography sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgb(102,51,153,0.7)',
                    minHeight: '50px'
                }}>
                    <h2 style={{ color: '#ffff' }}>Obsessive Compulsive Disorder</h2>
                </Typography>
                <Typography sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'center',
                    minHeight: '50px'
                }}>
                    <p> People with Obsessive Compulsive Disorder are plagued by unwanted thoughts (Obsession) or feel that
                        they must carry out some actions (Compulsion) against their will.
                    </p>
                    <p>An Obsession is a recurring, persistent and unwanted thought. <br />
                        Eg: A student is unable to stop thinking that she forgot to put her name in the exam paper.

                    </p>
                    <p>
                        An Compulsion is an irresistible urge to carry out some action which is unreasonable even to them.<br />
                        Eg: Continuously washing hand while cooking.
                    </p>

                </Typography>
            </Box>
            <Box id="1">
                <Typography sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'center',
                    minHeight: '50px'
                }}>
                    <div className="col-lg-12 card card-body" style={{ padding: "0px 50px 10px 10px" }}>
                        <h2 style={{ color: "rgb(102,51,153)", fontWeight: 700 }}>Symptoms of Obsessive Compulsive Disorder</h2>
                        <ul>
                            <li className="symptomsLsit">Disorganized thinking and speech</li>
                            <p>
                                Their speech and thinking do not make sense. Basic grammatical structure might be fine but the content is illogical.
                            </p>
                            <p>
                                E.g., Schizophrenic person's response to the question "Why do you think people believe in God?":
                            </p>
                            <ul>
                                <li className="symptomsSubLsit" style={{ fontWeight: 200 }}>
                                    Uh, let's. I don't know why, let's see, balloon travel. He holds it up for you, the balloon. He don't let you fall out,
                                    your little legs sticking down through the clouds. He's down to the smokestack, looking through the smoke trying to get the
                                    balloon gassed up you...
                                </li>
                            </ul>
                            <li className="symptomsLsit">Emotional Disturbance: Schizophrenic people might lack emotional responses or show inappropriate responses.</li>
                            <li className="symptomsLsit">Delusions: Strong, false beliefs that are not based in reality.</li>
                            <p>E.g.:</p>
                            <ul>
                                <li className="symptomsSubLsit">Someone is trying to murder you.</li>
                                <li className="symptomsSubLsit">A major catastrophe is about to occur.</li>
                                <li className="symptomsSubLsit">Another person is in love with you.</li>
                            </ul>
                            <li className="symptomsLsit">Hallucinations: Seeing, hearing, or feeling things that don't exist.</li>
                            <p>E.g.:</p>
                            <ul>
                                <li className="symptomsSubLsit">Seeing ghosts.</li>
                                <li className="symptomsSubLsit">Being haunted by the dead.</li>
                            </ul>
                        </ul>
                        <div className="row">
                            <div className="col-lg-6 seekhelp revealleft" style={{ backgroundColor: "rgb(177,156,217,0.4)" }}>
                                <h2>Offer Help</h2>
                                <ul>
                                    <li className="symptomsSubLsit">
                                        If you believe someone is exhibiting schizophrenic behaviors because schizophrenic people are not aware of their condition.
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-6 seekhelp revealright" style={{ backgroundColor: "rgb(186,85,211,0.4)" }}>
                                <h2>Causes</h2>
                                <ul>
                                    <li className="symptomsSubLsit">Differences in brain chemistry and function</li>
                                    <li className="symptomsSubLsit">Inherited mental health risks</li>
                                    <li className="symptomsSubLsit">Considered as a brain disease</li>
                                </ul>
                            </div>
                        </div>
                        <div className="row reveal seekhelp" style={{ backgroundColor: "rgb(255,160,137,0.5)" }}>
                            <h2>A Person Is At Risk of Schizophrenia</h2>
                            <ul>
                                <li className="symptomsSubLsit">If having a family history of schizophrenia</li>
                                <li className="symptomsSubLsit">If had pregnancy and birth complications (E.g., malnutrition or exposure to toxins or virus infections)</li>
                                <li className="symptomsSubLsit">If known to Substance misuse</li>
                            </ul>
                        </div>
                    </div>
                </Typography>
            </Box>
        </Container>
    );
};

export default OCDTest;
