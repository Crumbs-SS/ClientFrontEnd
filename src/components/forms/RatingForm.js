import Radio from '@material-ui/core/Radio';
import { FaStar } from "react-icons/fa";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button } from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { useState} from 'react';

const RatingForm = ({rating, submitRating }) => {

    const [score, setScore] = useState(0);
    const [description, setDescription] = useState(null);
    
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            {rating === "" ? <span>Submit a rating</span> : <span>View your rating:</span>}
          </AccordionSummary>
          <AccordionDetails>
            {rating === "" ? 
            <div>
            <span>Select a rating:</span>
            &nbsp;&nbsp;
            {[...Array(5)].map((item, index) => {
                const givenScore = index + 1;
                return (
                    <label key={index}>
                        <Radio
                            type="radio"
                            style={{ display: "none" }}
                            value={givenScore}
                            onClick={() => {
                                setScore(givenScore);
                            }}
                        />
                        <div style={{ cursor: "pointer" }}>
                            <FaStar
                                color={
                                    givenScore < score || givenScore === score
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
                onClick={() => submitRating(score, description)}
                variant='contained'
                color="primary"
                disabled={rating === 0}
            >
                Submit Rating
            </Button>
    </div> :
              <>
                <div>
                  <p>Rating: {rating ? rating.rating : null}</p>
                  <p>Description: {rating ? rating.description : null}</p>
                </div>
              </>}
          </AccordionDetails>
        </Accordion>
        </>
    );

}
export default RatingForm;
