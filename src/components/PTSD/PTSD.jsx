import React, { useState } from 'react';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { Box, Container, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import SecondaryButton from "../secondary-button/SecondaryButton";
import aboutUsImg from "../../assets/main/about-us-img.svg";
import { Margin } from "@mui/icons-material";
import { fontSize } from "@mui/system";

const questions = [
    {
        id: 1,
        name: "1.Have nightmares related to the experience ?",
        options: [
            {
                value: 5,
                name: "Always",
            },
            {
                value: 4,
                name: "Often",
            },
            {
                value: 3,
                name: "Sometimes",
            },
            {
                value: 2,
                name: "Rarely",
            },
            {
                value: 1,
                name: "Never",
            },
        ],
    },
    {
        id: 2,
        name: "2. Avoid getting into similar situations, places or events ?",
        options: [
            {
                value: 5,
                name: "Always",
            },
            {
                value: 4,
                name: "Often",
            },
            {
                value: 3,
                name: "Sometimes",
            },
            {
                value: 2,
                name: "Rarely",
            },
            {
                value: 1,
                name: "Never",
            },
        ],
    },
    {
        id: 3,
        name: "3. Remembering the experience at unwanted times ?",
        options: [
            {
                value: 5,
                name: "Always",
            },
            {
                value: 4,
                name: "Often",
            },
            {
                value: 3,
                name: "Sometimes",
            },
            {
                value: 2,
                name: "Rarely",
            },
            {
                value: 1,
                name: "Never",
            },
        ],
    },
    {
        id: 4,
        name: "4. Getting frightened upon remembering the experience ?",
        options: [
            {
                value: 5,
                name: "Always",
            },
            {
                value: 4,
                name: "Often",
            },
            {
                value: 3,
                name: "Sometimes",
            },
            {
                value: 2,
                name: "Rarely",
            },
            {
                value: 1,
                name: "Never",
            },
        ],
    },
    {
        id: 5,
        name: "5. Trouble falling asleep because of the memories of the experience ?",
        options: [
            {
                value: 5,
                name: "Always",
            },
            {
                value: 4,
                name: "Often",
            },
            {
                value: 3,
                name: "Sometimes",
            },
            {
                value: 2,
                name: "Rarely",
            },
            {
                value: 1,
                name: "Never",
            },
        ],
    },
];
const initialVisibility = false; 

const PTSD = () => {
    const [value, setValue] = React.useState(questions);

    const handleChange = (event, id) => {
        const newValue = value.map((valueItem) => {
            if (valueItem.id === id) {
                return {
                    ...valueItem,
                    answer: event.target.value,
                };
            }
            return valueItem;
        });

        setValue(newValue);
    };
    const [isContentVisible, setIsContentVisible] = useState(initialVisibility);

    const toggleContentVisibility = () => {
      setIsContentVisible(!isContentVisible);
    };
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
                    backgroundColor: 'rgb(32,178,170,0.7)',
                    minHeight: '50px'
                }}>
                    <h2 style={{ color: '#ffff' }}>Post Traumatic Stress Disorder(PTSD)</h2>
                </Typography>
                <Typography sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'center',
                    minHeight: '50px'
                }}>
                    <p>PTSD is a serious mental condition that some people develop after a shocking, terrifying, or dangerous event. These events are called traumas.<div></div>
                        Most people who go through traumatic events may have temporary difficulty adjusting and coping, but with time and good self-care,
                        they usually get better. If the symptoms get worse, last for months or even years, and interfere with your day-to-day functioning, you may have PTSD.
                        Living with PTSD can be challenging and it causes problems in your daily life, such as in relationships and at work. It can also take a toll on your physical health. But with treatment, you can live a fulfilling life.
                    </p>

                    <Button onClick={toggleContentVisibility}>
          {isContentVisible ? 'See Less' : 'See More'}
        </Button>

                </Typography>
            </Box>
            {isContentVisible && (
            <Box id="1">
                <Typography sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'center',
                    minHeight: '50px'
                }}>
                    <h2 style={{ fontSize: '20px', color: 'rgba(54,117,136)' }}>Symptoms of PTSD </h2>
                    <p>Post-traumatic stress disorder symptoms may start within one month of a traumatic event,
                        but sometimes symptoms may not appear until years after the event. PTSD symptoms can be categorized into 4.</p>

                    <h3 style={{ color: 'rgb(54,117,136)', fontStyle: "italic", textAlign: "left" }}>1.Intrusive Memory.</h3>
                    <ul >
                        <li class="symptomsLsit">Recurrent, unwanted distressing memories of the traumatic event</li>
                        <li class="symptomsLsit">Flashbacks : Reliving the traumatic event as if it were happening again.</li>
                        <li class="symptomsLsit">Nightmare : Upsetting, Unpleasant dreams</li>
                    </ul>

                    <h3 style={{ color: 'rgb(54,117,136)', fontStyle: "italic", textAlign: "left" }}>2.Avoidance</h3>
                    <ul >
                        <li class="symptomsLsit">Avoid thinking or talking about the traumatic event</li>
                        <li class="symptomsLsit">Avoid places, activities or people that reminds the event</li>
                    </ul>

                    <h3 style={{ color: 'rgb(54,117,136)', fontStyle: "italic", textAlign: "left" }}>3.Mood changes</h3>
                    <ul >
                        <li class="symptomsLsit">Lack of interest in activities you once enjoyed</li>
                        <li class="symptomsLsit">Emotional Numbness</li>
                        <li class="symptomsLsit">Hopelessness</li>
                    </ul>
                    <h3 style={{ color: 'rgb(54,117,136)', fontStyle: "italic", textAlign: "left" }}>4.Emotional and physical changes</h3>
                    <ul >
                        <li class="symptomsLsit">Trouble sleeping</li>
                        <li class="symptomsLsit">Irritability or aggressiveness</li>
                        <li>Self-destructive behaviors</li>
                    </ul>
                    <h2 style={{backgroundColor: 'rgb(0,204,153,0.3)',textAlign:"center"}}>Seek Help</h2>
                    <ul>
                        <li class="symptomsSubLsit">If you have suicidal thoughts</li>
                        <li class="symptomsSubLsit">If You are unable control yourself</li>
                    </ul>

                    <h2 style={{backgroundColor: 'rgb(123,182,97,0.5)',textAlign:"center"}}>Causes</h2>
                    <ul>
                        <li class="symptomsSubLsit">Differences in brain chemistry and function</li>
                        <li class="symptomsSubLsit">Inherited mental health risks</li>
                    </ul>


                    <h2 style={{backgroundColor: 'rgb(199,21,133,0.2)',textAlign:"center"}}>You Are At Risk of PTSD</h2>
                    <ul>
                        <li class="symptomsSubLsit">If you are having a job that increases your risk of being exposed to traumatic events, such as military personnel and first responders</li>
                        <li class="symptomsSubLsit">Having problems with substance misuse, such as excess drinking or drug use</li>
                        <li class="symptomsSubLsit">Lacking a good support system of family and friends</li>
                    </ul>
                </Typography>
            </Box>
            )}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        md: "column",
                    },
                    justifyContent: "center",
                    gap: 4,
                    alignItems: "center",
                }}
            >
                <Typography sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50px'
                }}>
                    <h2>Post Traumatic Stress Disorder Test</h2>
                    <p style={{ color: 'red' }}>P.C.- This test is just for <strong>self-evaluation</strong> purpose only. It is not a diagnostic tool.&nbsp;&nbsp;</p>
                </Typography>

                {value.map((question) => (
                    <FormControl style={{ width: "100%" }}>
                        <div style={{ display: "flex" }}>
                            <FormLabel
                                id="demo-row-radio-buttons-group-label"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginRight: "10px",
                                }}
                                sx={{ flex: 1 }}
                            >
                                {question.name}
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                sx={{ flex: 1 }}
                                value={question.answer}
                                onChange={(e) => handleChange(e, question.id)}
                            >
                                {question.options.map((option) => (
                                    <FormControlLabel
                                        value={option.value}
                                        control={<Radio />}
                                        label={option.name}
                                    />
                                ))}
                            </RadioGroup>
                        </div>
                    </FormControl>
                ))}
            </Box>
        </Container>
    );
};

export default PTSD;
