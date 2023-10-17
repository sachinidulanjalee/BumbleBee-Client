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
        name: "1. Feeling nervous or anxious?",
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
        name: "2.Feeling unpleasant mucsel tension?",
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
        name: "3.Getting easily startled?",
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
        name: "4.Being unable to control worrying?",
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
        name: "5.Feeling hopeless?",
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
        name: "6.Trouble falling asleep or staying asleep?",
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
        name: "7.Difficulties in concentrating.?",
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
        name: "8.Getting irritated easily.?",
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
        name: "9. Feeling tired and restless?",
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
        name: "10.Do your worry and anxiousness affect your day to day activities?",
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

const GAD = () => {
    const [value, setValue] = React.useState(questions);
    const [result, setResult] = useState("0");
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState("");
    const [userAnswers, setUserAnswers] = useState([]);
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
        try {
            const response = await AnalysisService.GAD(userAnswers);

            if (response.data.result_GeneralizedAnxiety != null) {
                setResult(response.data.result_GeneralizedAnxiety);
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
                    backgroundColor: 'rgb(25,25,112,0.6)',
                    minHeight: '50px'
                }}>
                    <h2 style={{ color: '#ffff' }}>Generalized Anxiety Disorder</h2>
                </Typography>
                <Typography sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'center',
                    minHeight: '50px'
                }}>
                    <p> People with Generalized Anxiety disorder experience long-term persistent anxiety and worry.
                        Sometimes their concerns are directed to the identifiable issues such as money, family, health etc.
                        Because of this persistent anxiety, they cannot focus or concentrate on any other thing and they cannot
                        set their worry aside.  after sometime this can result in medical problems such as headaches, dizziness,
                        heart palpitation or insomnia caused by the heightened muscle tension and arousal.
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
                            <div className="row">
                                <div className="col-lg-12 card card-body" style={{ padding: '0px 50px 10px 10px' }}>
                                    <h2 style={{ color: 'rgb(25, 25, 112)', fontWeight: 700 }}>Symptoms of Generalized Anxiety</h2>
                                    <ul>
                                        <li className="symptomsLsit">
                                            The presence of excessive anxiety and worry about a variety of topics, events, or activities. Worry occurs more often than not for at least six months and is clearly excessive.
                                        </li>
                                        <li className="symptomsLsit">
                                            The worry is experienced as very challenging to control and easily shift from one topic to another.
                                        </li>
                                        <li className="symptomsLsit">
                                            The anxiety and worry are accompanied by at least three of the following physical or cognitive symptoms
                                            <ul>
                                                <li className="symptomsSubLsit">
                                                    Edginess or restlessness.
                                                </li>
                                                <li className="symptomsSubLsit">
                                                    Tiring easily; more fatigued than usual.
                                                </li>
                                                <li className="symptomsSubLsit">
                                                    Impaired concentration or feeling as though the mind goes blank.
                                                </li>
                                                <li className="symptomsSubLsit">
                                                    Irritability (which may or may not be observable to others).
                                                </li>
                                                <li className="symptomsSubLsit">
                                                    Increased muscle aches or soreness.
                                                </li>
                                                <li className="symptomsSubLsit">
                                                    Difficulty sleeping (due to trouble falling asleep or staying asleep, restlessness at night, or unsatisfying sleep)
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <p>If someone is having these symptoms and if it cannot be explained by a different mental disorder or by the effect of substance use, including prescription medication, alcohol, or recreational drugs, that person is more likely to suffer from Generalized Anxiety.</p>
                            <br />
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <div style={{
                                        backgroundColor: 'rgb(80, 114, 167, 0.3)',
                                    }}>
                                        <h1>Seek Help</h1>
                                        <ul>
                                            <li className="symptomsSubLsit">If Your worry is interfering with your daily routine and relationships</li>
                                            <li className="symptomsSubLsit">If You seem to have any other mental disorders.</li>
                                        </ul>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{
                                        backgroundColor: 'rgb(0, 170, 228, 0.3)',
                                    }}>
                                        <h1>Causes</h1>
                                        <ul>
                                            <li className="symptomsSubLsit">Differences in brain chemistry and function</li>
                                            <li className="symptomsSubLsit">Development and personality</li>
                                            <li className="symptomsSubLsit">Genetics</li>
                                        </ul>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <div style={{
                                        backgroundColor: 'rgb(199, 21, 133, 0.2)',
                                    }}>
                                        <h1>You Are At Risk</h1>
                                        <ul>
                                            <li className="symptomsSubLsit">If your temperament is timid or negative.</li>
                                            <li className="symptomsSubLsit">If You have a history of significant life changes, traumatic or negative experiences during childhood, or a recent traumatic or negative event.</li>
                                        </ul>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Typography>
                </Box>
            )
            }
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
                    <h2>Generalized Anxiety Test</h2>
                    <p style={{ color: 'red' }}>P.C.- This test is just for <strong>self-evaluation</strong> purpose only. It is not a diagnostic tool.&nbsp;&nbsp;</p>
                    <p >Mark how often have you been bothered by below feelings over the past <b>6 months</b>.</p>


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
                        value="Generalized Anxiety Disorder"
                    />
                    <input type="hidden" name="DisorderId" value="1001" />
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
                            <h2>Post Traumatic Stress Disorder Test Result</h2>
                            <h3 style={{ color: "red" }}>
                                Your Answers Score is - <strong>{((result * 100) / 10).toFixed(2)}%</strong>
                            </h3>
                            <p style={{ textAlign: "left" }}>
                                This result does not indicate that you are diagnosed for this disorder.It is just an indication of the possibility of you having the disorder only.<br />
                                But we suggest you to seek help from a medical professional.<br /><br />
                                Psychological disorder can only be diagnosed by a human medical professional. So, the best option is to meet a medical professional.
                            </p>
                            <Button variant="contained"   onClick={() => navigateToComponent('/Professional')} >
                                View Professionals
                            </Button>
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container >
    );
};

export default GAD;
