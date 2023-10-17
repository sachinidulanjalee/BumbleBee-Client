import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import AnalysisService from "../../services/analysisservice";
import { color } from "@mui/system";

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
        // e.preventDefault();
        //alert(userAnswers);


        try {
            const response = await AnalysisService.PTSD(userAnswers);

            if (response.data.result_ptsd != null) {
                setResult(response.data.result_ptsd);
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
                <Typography
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgb(32,178,170,0.7)",
                        minHeight: "50px",
                    }}
                >
                    <h2 style={{ color: "#ffff" }}>
                        Post Traumatic Stress Disorder(PTSD)
                    </h2>
                </Typography>
                <Typography
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        justifyContent: "center",
                        minHeight: "50px",
                    }}
                >
                    <p>
                        PTSD is a serious mental condition that some people develop after a
                        shocking, terrifying, or dangerous event. These events are called
                        traumas.<div></div>
                        Most people who go through traumatic events may have temporary
                        difficulty adjusting and coping, but with time and good self-care,
                        they usually get better. If the symptoms get worse, last for months
                        or even years, and interfere with your day-to-day functioning, you
                        may have PTSD. Living with PTSD can be challenging and it causes
                        problems in your daily life, such as in relationships and at work.
                        It can also take a toll on your physical health. But with treatment,
                        you can live a fulfilling life.
                    </p>

                    <Button onClick={toggleContentVisibility}>
                        {isContentVisible ? "See Less" : "See More"}
                    </Button>
                </Typography>
            </Box>
            {isContentVisible && (
                <Box id="1">
                    <Typography
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "left",
                            justifyContent: "center",
                            minHeight: "50px",
                        }}
                    >
                        <div
                            className="col-lg-12 card card-body"
                            style={{ padding: "0px 50px 10px 10px" }}
                        >
                            <h2 style={{ fontSize: "20px", color: "rgba(54,117,136)" }}>
                                Symptoms of PTSD{" "}
                            </h2>
                            <p>
                                Post-traumatic stress disorder symptoms may start within one
                                month of a traumatic event, but sometimes symptoms may not
                                appear until years after the event. PTSD symptoms can be
                                categorized into 4.
                            </p>
                            <div className="row">
                                <div className="col-lg-6">
                                    <ul>
                                        <li>
                                            <h3 style={{ color: "rgb(54, 117, 136)" }}>
                                                Intrusive Memory.
                                            </h3>
                                            <ul>
                                                <li className="symptomsLsit">
                                                    Recurrent, unwanted distressing memories of the
                                                    traumatic event
                                                </li>
                                                <li className="symptomsLsit">
                                                    Flashbacks : Reliving the traumatic event as if it
                                                    were happening again.
                                                </li>
                                                <li className="symptomsLsit">
                                                    Nightmare : Upsetting, Unpleasant dreams
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-6">
                                    <ul>
                                        <li>
                                            <h3 style={{ color: "rgb(54, 117, 136)" }}>Avoidance</h3>
                                            <ul>
                                                <li className="symptomsLsit">
                                                    Avoid thinking or talking about the traumatic event
                                                </li>
                                                <li className="symptomsLsit">
                                                    Avoid places, activities or people that remind the
                                                    event
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <ul>
                                        <li>
                                            <h3 style={{ color: "rgb(54, 117, 136)" }}>
                                                Mood changes
                                            </h3>
                                            <ul>
                                                <li className="symptomsLsit">
                                                    Lack of interest in activities you once enjoyed
                                                </li>
                                                <li className="symptomsLsit">Emotional Numbness</li>
                                                <li className="symptomsLsit">Hopelessness</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-6">
                                    <ul>
                                        <li>
                                            <h3 style={{ color: "rgb(54, 117, 136)" }}>
                                                Emotional and physical changes
                                            </h3>
                                            <ul>
                                                <li className="symptomsLsit">Trouble sleeping</li>
                                                <li className="symptomsLsit">
                                                    Irritability or aggressiveness
                                                </li>
                                                <li>Self-destructive behaviors</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div
                                className="col-lg-6 seekhelp revealleft"
                                style={{ backgroundColor: "rgba(0, 204, 153, 0.3)" }}
                            >
                                <h2>Seek Help</h2>
                                <ul>
                                    <li className="symptomsSubLsit">
                                        If you have suicidal thoughts
                                    </li>
                                    <li className="symptomsSubLsit">
                                        If You are unable to control yourself
                                    </li>
                                </ul>
                            </div>
                            <div
                                className="col-lg-6 seekhelp revealright"
                                style={{ backgroundColor: "rgba(123, 182, 97, 0.5)" }}
                            >
                                <h2>Causes</h2>
                                <ul>
                                    <li className="symptomsSubLsit">
                                        Differences in brain chemistry and function
                                    </li>
                                    <li className="symptomsSubLsit">
                                        Inherited mental health risks
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div
                            className="row reveal seekhelp"
                            style={{ backgroundColor: "rgba(199, 21, 133, 0.2)" }}
                        >
                            <h2>You Are At Risk of PTSD</h2>
                            <ul>
                                <li className="symptomsSubLsit">
                                    If you are having a job that increases your risk of being
                                    exposed to traumatic events, such as military personnel and
                                    first responders
                                </li>
                                <li className="symptomsSubLsit">
                                    Having problems with substance misuse, such as excess drinking
                                    or drug use
                                </li>
                                <li className="symptomsSubLsit">
                                    Lacking a good support system of family and friends
                                </li>
                            </ul>
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
                <Typography
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "50px",
                    }}
                >
                    <h2>Post Traumatic Stress Disorder Test</h2>
                    <p style={{ color: "red" }}>
                        P.C.- This test is just for <strong>self-evaluation</strong> purpose
                        only. It is not a diagnostic tool.&nbsp;&nbsp;
                    </p>
                    <p class="makeCenter bold">
                        Have you experienced unusually or especially frightening, -
                        horrible, or traumatic event recently? <br /> If so, mark how often
                        have you been bothered by below feelings over the past <b>month</b>.
                    </p>
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
                        value="Post Traumatic Stress Disorder"
                    />
                    <input type="hidden" name="DisorderId" value="1002" />
                    {value.map((question) => (
                        <FormControl style={{ width: "100%" }} error={error}>
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
                                Your Answers Score is - <strong>{((result * 100) / 5).toFixed(2)}%</strong>
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

export default PTSD;
