import React, { useState } from 'react';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { Box, Container, Typography } from "@mui/material";
import SecondaryButton from "../secondary-button/SecondaryButton";
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';
import { useNavigate } from "react-router-dom";

const questions = [
    {
        id: 1,
        name: "  1. Feeling nervous or anxious ?",
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
        name: "2.Being unable to control worrying ?",
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
        name: " 3. Trouble falling asleep or staying asleep?",
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
        name: "4.Difficulties in concentrating?",
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
        name: "5. Feeling tired and restless?",
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
        id: 6,
        name: " 6. Do your worry and anxiousness affect your day to day activities?",
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
        id: 7,
        name: "7. Have nightmares related to a traumatic experience you once had?",
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
        id: 8,
        name: " 8. Avoid getting into situations, places or events that reminds you the above experience?",
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
        id: 9,
        name: "9. Having happy or elated feelings as well as sad or depressive feelings at the same time?",
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
        id: 10,
        name: " 10. Feel like doing dangerous things without the fear of failure?",
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

const BasicTest = () => {
    const [value, setValue] = React.useState(questions);
    const [userAnswers, setUserAnswers] = useState([]);
    const [result, setResult] = useState("0");

    const handleChange = (e, questionId) => {
        const selectedValue = parseInt(e.target.value); // Parse the selected value as an integer

        // Find the question in the array of questions
        const question = questions.find((q) => q.id === questionId);

        // Create an updated array with just the selected values
        const updatedUserAnswers = [
            ...userAnswers.filter((ua) => ua.id !== questionId), // Remove the old answer, if it exists
            selectedValue, // Add the new selected value
        ];

        // Update the state with the updated userAnswers array
        setUserAnswers(updatedUserAnswers);

    };
    const [isContentVisible, setIsContentVisible] = useState(initialVisibility);

    const toggleContentVisibility = () => {
        setIsContentVisible(!isContentVisible);
    };

    const navigate = useNavigate();

    const navigateToComponent = (path) => {
      // Use the history.push method to navigate to the desired route
      navigate(path);
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
                    backgroundColor: 'rgb(25,25,112,0.6)',
                    minHeight: '50px'
                }}>
                    <h1 style={{ color: '#ffff' }}>The Basic Test</h1>

                </Typography>
                <Typography sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50px'
                }}>
                    <h2>
                    
                    <HelpRoundedIcon/>
                    &nbsp;No Idea Which Test To Do?</h2>
                    <h3> Don't Worry! Try This One &nbsp; <SentimentSatisfiedAltRoundedIcon/> </h3> 
                </Typography>
            </Box>
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
                    <p style={{ color: 'red' }}>P.C.- This test is just for <strong>self-evaluation</strong> purpose only. It is not a diagnostic tool.&nbsp;&nbsp;</p>
                    <p style={{  fontWeight: 'bold'}}>Carefully read and answer the questions below. It will help to identify the possibilities of you having relevant disorders. <br/>The result of this test will give you an idea which test
                        you should do next.
                </p>
                </Typography>

                {value.map((question) => (
                    <FormControl style={{ width: "100%" }}>
                        <div style={{ display: "flex" }}>
                            <FormLabel
                                id="demo-row-radio-buttons-group-label"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "left",
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
                <Button variant="contained" endIcon={<SendIcon />} onClick={() => navigateToComponent('/BasicResult')}>
                    Check Your Result
                </Button>
            </Box>
        </Container>
    );
};

export default BasicTest;
export { BasicTest };
