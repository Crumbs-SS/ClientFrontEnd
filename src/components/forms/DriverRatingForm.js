import { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import { FaStar } from "react-icons/fa";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button } from "@material-ui/core";

const DriverRatingForm = ({submitRating}) => {

    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState(null);

    return (
        <>
            <div>
                    <span>Select a rating:</span>
                    &nbsp;&nbsp;
                    {[...Array(5)].map((item, index) => {
                        const givenRating = index + 1;
                        return (
                            <label key={index}>
                                <Radio
                                    type="radio"
                                    style={{ display: "none" }}
                                    value={givenRating}
                                    onClick={() => {
                                        setRating(givenRating);
                                    }}
                                />
                                <div style={{ cursor: "pointer" }}>
                                    <FaStar
                                        color={
                                            givenRating < rating || givenRating === rating
                                                ? "000"
                                                : "rgb(192,192,192)"
                                        }
                                    />
                                </div>
                            </label>
                        );
                    })}
                    <br /><br />
                    <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Enter a description (optional)" style={{ width: "100%" }} onChange={(e) => setDescription(e.target.value)} />
                    <Button
                        onClick={() => submitRating(rating, description)}
                        variant='contained'
                        color="primary"
                        disabled={rating === 0}
                    >
                        Submit Rating
                    </Button>
            </div>
        </>
    );

}
export default DriverRatingForm;
