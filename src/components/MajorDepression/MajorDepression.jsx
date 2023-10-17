import React, { useState } from 'react';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Grid } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import AnalysisService from "../../services/analysisservice";

const questions = [
    {
        id: 1,
        name: "1. Feeling down or depressed?",
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
        name: "2.Poor appetite or overeating?",
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
        name: "3.Feeling unreasonable guilt or shame",
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
        name: "5.Noticeable slowness of movements?",
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
        name: "6.Thinks that you are better off dead?",
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
        name: "7.Thoughts of physically harm yourself?",
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
        name: "8.Does Your Personal or professional life getting affected by these feelings or thoughts.?",
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

const MajorDepression = () => {
    const [value, setValue] = React.useState(questions);
    const [result, setResult] = useState("0");
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState("");
    const [userAnswers, setUserAnswers] = useState([]);
    const navigate = useNavigate();
    const navigateToComponent = (path) => {
        // Use the history.push method to navigate to the desired route
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

        try {
            const response = await AnalysisService.Mdepression(userAnswers);

            if (response.data.result_depression != null) {
                setResult(response.data.result_depression);
                alert(response.data.result_depression);
            } else {
                alert("Try Again!");
            }
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }

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
                    <h2 style={{ color: '#ffff' }}>Major Depression</h2>
                </Typography>
                <Typography sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'center',
                    minHeight: '50px'
                }}>
                    <p> Major Depression is the most common mood disorder that causes a persistent feeling of sadness and loss of interest.
                        Women are twice as likely as men to have major depression. Major depression is not the sadness that comes from experiencing
                        one of life's disappointment. Some depression are normal following a breakup, death of a loved one or loose of a job.People with
                        Major depression experience similar feelings but with more severity.
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
                        <div>
                            <div className="col-lg-12 card card-body" style={{
                                padding: '0px 50px 10px 10px',
                                color: 'rgb(226, 88, 34)',
                                fontWeight: 700,
                            }}>
                                <h2>Symptoms of Major Depression</h2> </div>
                            <ul>
                                <li className="symptomsLsit">Feelings of sadness, tearfulness, emptiness, or hopelessness</li>
                                <li className="symptomsLsit">Angry outbursts, irritability, or frustration, even over small matters</li>
                                <li className="symptomsLsit">Loss of interest or pleasure in most or all normal activities, such as sex, hobbies, or sports</li>
                                <li className="symptomsLsit">Sleep disturbances, including insomnia or sleeping too much</li>
                                <li className="symptomsLsit">Tiredness and lack of energy, so even small tasks take extra effort</li>
                                <li className="symptomsLsit">Reduced appetite and weight loss or increased cravings for food and weight gain</li>
                                <li className="symptomsLsit">Anxiety, agitation, or restlessness</li>
                                <li className="symptomsLsit">Slowed thinking, speaking, or body movements</li>
                                <li className="symptomsLsit">Trouble thinking, concentrating, making decisions, and remembering things</li>
                                <li className="symptomsLsit">Frequent or recurrent thoughts of death, suicidal thoughts, suicide attempts, or suicide</li>
                            </ul>

                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <div style={{
                                        backgroundColor: 'rgb(255, 153, 51, 0.5)',
                                    }}>
                                        <h2>Seek Help</h2>
                                        <ul>
                                            <li className="symptomsSubLsit">If you have suicidal thoughts</li>
                                            <li className="symptomsSubLsit">If You are unable to control yourself</li>
                                            <li className="symptomsSubLsit">If You think you may hurt yourself</li>
                                        </ul>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{ backgroundColor: 'rgb(226, 114, 91, 0.5)' }}>
                                        <h2>Causes</h2>
                                        <ul>
                                            <li className="symptomsSubLsit">Differences in brain chemistry and function</li>
                                            <li className="symptomsSubLsit">Inherited mental health risks</li>
                                            <li className="symptomsSubLsit">Changes in the body's balance of hormones</li>
                                        </ul>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="row reveal seekhelp" style={{ backgroundColor: 'rgb(134, 126, 54, 0.4)' }}>
                                <h2>You Are At Risk of Major Depression</h2>
                                <ul>
                                    <li className="symptomsSubLsit">If you have low self-esteem and are dependent.</li>
                                    <li className="symptomsSubLsit">If you have experienced traumatic or stressful events.</li>
                                    <li className="symptomsSubLsit">If you have a serious or chronic illness.</li>
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
                    <h2>Major Depression Test</h2>
                    <p style={{ color: 'red' }}>P.C.- This test is just for <strong>self-evaluation</strong> purpose only. It is not a diagnostic tool.&nbsp;&nbsp;</p>
                    <p >Mark how often have you been bothered by below feelings over the past few weeks.</p>


                </Typography>
                <form
                    action="MultipleLinearRegression"
                    method="post"
                    onSubmit={handleSubmit}
                >
                    {/* Hidden input fields */}
                    <input
                        type="hidden"
                        name="filename"
                        value="Major Depression"
                    />
                    <input type="hidden" name="DisorderId" value="1004" />
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
                            <h2>Major Depression Disorder Test Result</h2>
                            <h3 style={{ color: "red" }}>
                                Your Answers Score is - <strong>{((result * 100) / 8).toFixed(2)}%</strong>
                            </h3>
                            <p style={{ textAlign: "left" }}>
                                This result does not indicate that you are diagnosed for this disorder.It is just an indication of the possibility of you having the disorder only.<br />
                                But we suggest you to seek help from a medical professional.<br /><br />
                                Psychological disorder can only be diagnosed by a human medical professional. So, the best option is to meet a medical professional.
                            </p>
                            <Button variant="contained" onClick={() => navigateToComponent('/Professional')}>
                                View Professionals
                            </Button>
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default MajorDepression;
