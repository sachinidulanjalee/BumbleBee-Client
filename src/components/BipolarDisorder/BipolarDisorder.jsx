import React, { useState } from 'react';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Grid, FormHelperText } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AnalysisService from "../../services/analysisservice";

const questions = [
    {
        id: 1,
        name: "1. Feel more active than usual?",
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
        name: "2. Being talkative than or and talk faster than usual?",
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
        name: "3. Feel an intense happiness or powerfulness?",
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
        name: "4. Feel like doing dangerous things without the fear of failure?",
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
        name: " 5. Having happy or elated feelings as well as sad or depressive feelings at the same time?",
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
        name: " 6. Self-Confidence ranges from High self-Confidence to High Self-Doubt",
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
        name: "7. Some times I get irritated by the things that I normally enjoy.?",
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

const BipolarDisorder = () => {
    const [value, setValue] = React.useState(questions);
    const [result, setResult] = useState("0");
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState("");
    const [userAnswers, setUserAnswers] = useState([]);
    const [questionErrors, setQuestionErrors] = useState(new Array(questions.length).fill(false));
    const navigate = useNavigate();
    
    const navigateToComponent = (path) => {
        navigate(path);
      };

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
    const handleSubmit = async (e) => {
        // e.preventDefault();
        //alert(userAnswers);

        if (validateAnswers()) {
            try {
                const response = await AnalysisService.BipolarDisorder(userAnswers);

                if (response.data.result_BipolarDisorder != null) {
                    setResult(response.data.result_BipolarDisorder);
                } else {
                    alert("Try Again!");
                }
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error);
            }
        }

    };

    const validateAnswers = () => {
        let hasError = false;
        const updatedQuestionErrors = userAnswers.map((answer, index) => {
            if (answer === undefined) {
                hasError = true;
                return true; // Mark as error
            }
            return false; // No error
        });

        // Update the error state for questions
        setQuestionErrors(updatedQuestionErrors);

        return !hasError; // Return true if there are no errors
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
                    backgroundColor: 'rgb(226,88,34,0.7)',
                    minHeight: '50px'
                }}>
                    <h1 style={{ color: '#ffff' }}>Bipolar Disorder</h1>
                </Typography>
                <Typography sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'center',
                    minHeight: '50px'
                }}>
                    <p style={{ fontWeight: 'bold' }}>
                        Bipolar disorder, is a mental health condition that causes extreme mood swings that include emotional highs (mania or hypomania) and lows (depression).
                        <br />Mania is an extended version of intense wild elation. People with bipolar disorder feels invincible, intense happiness or power.
                        They might do wild schemes believing they will be succeed for sure.</p>
                    <p style={{ fontWeight: 'lighter' }}>
                        Eg: Mr.O'Reily took a leave of absence from his job and purchased cuckoo clocks and expensive car. he used the car as
                        a mobile showroom to sell the clocks expecting to make a grate deal of it and celebrating each evening in a nearby bar. Anyway
                        he was $3000 in debt and his family was driven into exhaustion because of his excessive activeness and talkativeness (Understanding Psychology, Sixth Edition).<br />
                    </p>
                    <p style={{ fontWeight: 'bold' }}>
                        A person who has mood swings between mania and depression can be suffering from bipolar disorder. Period
                        of depression is longer than the period of mania usually.
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
                        <div style={{ padding: '0px 50px 10px 10px' }}>
                            <h2 style={{
                                color: 'rgb(226, 88, 34)',
                                fontWeight: '700',
                            }}>Types of Bipolar Disorder</h2>
                            <ul style={{

                                fontWeight: 'lighter',
                            }}>
                                <li className="symptomsLsit">Bipolar I Disorder: You've had at least one manic episode that may be preceded or followed by hypomanic or major depressive episodes.</li>
                                <li className="symptomsLsit">Bipolar II Disorder: You've had at least one major depressive episode and at least one hypomanic episode, but you've never had a manic episode.</li>
                                <li className="symptomsLsit">Cyclothymic disorder: You've had at least two years of many periods of hypomania symptoms and periods of depressive symptoms (though less severe than major depression).</li>
                                <li className="symptomsLsit">Other: Bipolar and related disorders induced by certain drugs or alcohol or due to a medical condition, such as Cushing's disease, multiple sclerosis, or stroke.</li>
                            </ul>
                            <p>
                                Bipolar II disorder is not a milder form of bipolar I disorder, but a separate diagnosis.
                                While the manic episodes of bipolar I disorder can be severe and dangerous, individuals
                                with bipolar II disorder can be depressed for longer periods.
                            </p>
                        </div>

                        <div style={{ padding: '0px 50px 10px 10px' }}>
                            <h2 style={{ color: 'rgb(226, 88, 34)', fontWeight: 700 }}>Symptoms of Bipolar Disorder</h2>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <div style={{ paddingRight: '20px' }}>
                                        <h3 style={{ color: 'rgb(226, 88, 34)', fontWeight: '500' }}>Mania or Hypomania</h3>
                                        <p>Mania and hypomania are different but have the same symptoms.<br /> Mania is more severe and more noticeable.</p>
                                        <ul>
                                            <li className="symptomsLsit">Abnormally upbeat, jumpy or wired</li>
                                            <li className="symptomsLsit">Increased activity, energy or agitation</li>
                                            <li className="symptomsLsit">Exaggerated sense of well-being and self-confidence (Euphoria)</li>
                                            <li className="symptomsLsit">Decreased need for sleep</li>
                                            <li className="symptomsLsit">Unusual talkativeness</li>
                                            <li className="symptomsLsit">Racing thoughts</li>
                                            <li className="symptomsLsit">Distractibility</li>
                                            <li className="symptomsLsit">Poor decision-making</li>
                                        </ul>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{ paddingLeft: '20px' }}>
                                        <h3 style={{ color: 'rgb(226, 88, 34)', fontWeight: '500' }}>Major Depressive Episode</h3>
                                        <p>This episode causes more noticeable difficulties.</p>
                                        <ul>
                                            <li className="symptomsLsit">Either insomnia or sleeping too much</li>
                                            <li className="symptomsLsit">Either restlessness or slowed behavior</li>
                                            <li className="symptomsLsit">Fatigue or loss of energy</li>
                                            <li className="symptomsLsit">Feelings of worthlessness or excessive or inappropriate guilt</li>
                                            <li className="symptomsLsit">Decreased ability to think or concentrate, or indecisiveness</li>
                                            <li className="symptomsLsit">Thinking about, planning or attempting suicide</li>
                                            <li className="symptomsLsit">Loss of interest or feeling no pleasure in all</li>
                                        </ul>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>

                        <div>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <div style={{ backgroundColor: 'rgb(255, 153, 51, 0.5)' }}>
                                        <h2>Seek Help</h2>
                                        <ul>
                                            <li className="symptomsSubLsit">If you Enjoy the euphoria feeling</li>
                                            <li className="symptomsSubLsit">If You have any symptom of depression or mania.</li>
                                        </ul>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{ backgroundColor: 'rgb(226, 114, 91, 0.5)' }}>
                                        <h2>Causes</h2>
                                        <ul>
                                            <li className="symptomsSubLsit">Differences in brain chemistry and function</li>
                                            <li className="symptomsSubLsit">Inherited mental health risks</li>
                                        </ul>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="row reveal seekhelp" style={{ backgroundColor: 'rgb(134, 126, 54, 0.4)' }}>
                                <h2>You Are At Risk of Bipolar Disorder</h2>
                                <ul>
                                    <li className="symptomsSubLsit">If you have a first-degree relative, such as a parent or sibling, with bipolar disorder</li>
                                    <li className="symptomsSubLsit">If you have periods of high stress, such as the death of a loved one or other traumatic event</li>
                                    <li className="symptomsSubLsit">If you have experienced Drug or alcohol abuse.</li>
                                </ul>
                            </div>
                        </div>
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
                    <h2>Bipolar Disorder  Test</h2>
                    <p style={{ color: 'red' }}>P.C.- This test is just for <strong>self-evaluation</strong> purpose only. It is not a diagnostic tool.&nbsp;&nbsp;</p>
                    <p class="makeCenter bold">Mark how often your mood swings between high and low, considering below scenarios.</p>

                </Typography>
                <form
                    action="MultipleLinearRegression"
                    method="post"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="hidden"
                        name="filename"
                        value="Bipolar Disorder"
                    />
                    <input type="hidden" name="DisorderId" value="1003" />

                    {value.map((question, index) => (
                        <FormControl style={{ width: "100%" }}>
                            <div style={{ display: "flex" }}>
                                <FormLabel
                                    id={`question-${question.id}-label`}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: "10px",
                                    }}
                                    sx={{ flex: 1 }}
                                    required  
                                >
                                    {question.name}
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby={`question-${question.id}-label`}
                                    name={`row-radio-buttons-group-${question.id}`}
                                    sx={{ flex: 1 }}
                                    value={userAnswers[index]}
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
                            {questionErrors[index] && (
                                <FormHelperText>Please select an answer.</FormHelperText>
                            )}

                        </FormControl>
                    ))}
                </form>
                <Button variant="contained" onClick={() => handleSubmit()} endIcon={<SendIcon />} type="submit">
                    Check Your Result
                </Button>
                {result !== "0" && (
                    <Box id="2">
                        <Typography
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "rgb(32,178,170,0.5)",
                                borderRadius: {
                                    xs: "27px 27px 27px 27px",
                                    md: "54px 54px 54px 54px"
                                },
                                p: {
                                    xs: 2,
                                    sm: 5,
                                    md: 2,
                                },
                                minHeight: "50px",
                            }}
                        >
                            <h2>Post Traumatic Stress Disorder Test Result</h2>
                            <h3 style={{ color: "red" }}>
                                Your Answers Score is - <strong>{((result * 100) / 7).toFixed(2)}%</strong>
                            </h3>
                            <p style={{ textAlign: "left" }}>
                                This result does not indicate that you are diagnosed for this disorder.It is just an indication of the possibility of you having the disorder only.<br />
                                But we suggest you to seek help from a medical professional.<br /><br />
                                Psychological disorder can only be diagnosed by a human medical professional. So, the best option is to meet a medical professional.
                            </p>
                            <Button variant="contained"  onClick={() => navigateToComponent('/Professional')}>
                                View Professionals
                            </Button>
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default BipolarDisorder;
