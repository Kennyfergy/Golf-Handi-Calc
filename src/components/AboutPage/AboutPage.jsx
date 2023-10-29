import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="aboutPageContainer">
      <h2 className="aboutPageHeading">About the App</h2>
      <h3 className="aboutPageSubheading">Using the app</h3>
      <p className="aboutPageParagraph">
        After Logging in you are brought the the welcome page where you can see
        a quick summary of handicap index and rounds. From here you can quickly
        add a new round or add a new course. To navigate the app, there is a
        menu on the top right that opens a menu of every page.
      </p>
      <p className="aboutPageParagraph">
        The courses page displays all courses that have been added by you and by
        the admin. The courses you have added can be edited and deleted
      </p>
      <p className="aboutPageParagraph">
        The rounds page displays all of your rounds. From here you can edit any
        rounds or delete them
      </p>
      <h3 className="aboutPageSubheading">What is WHS?</h3>
      <p className="aboutPageParagraph">
        The World Handicap System (WHS) is a system that allows golfers of
        different abilities to play and compete on an equal basis. The WHS was
        developed by the USGA and The R&A in collaboration with other handicap
        bodies. It took effect on January 1, 2020
      </p>

      <h3 className="aboutPageSubheading">
        How is the Handicap Index calculated using the World Handicap System?
      </h3>
      <p className="aboutPageParagraph">
        The WHS calculates the Handicap Index based on a sliding scale of a
        player's lowest score differentials:
      </p>
      <ul className="aboutPageUl">
        <li>Best 3 rounds: Use 1 differential</li>
        <li>Best 8 rounds: Use 2 differentials</li>
        <li>Best 10 rounds: Use 3 differentials</li>
        <li>Best 12 rounds: Use 4 differentials</li>
        <li>Best 14 rounds: Use 5 differentials</li>
        <li>Best 16 rounds: Use 6 differentials</li>
        <li>Best 18 rounds: Use 7 differentials</li>
        <li>Everything after: Use best 8 differentials</li>
      </ul>
      <p className="aboutPageParagraph">
        Depending on the number of rounds played, the appropriate number of
        lowest differentials is taken into account to compute the average, which
        then represents the Handicap Index.
      </p>
      <h3 className="aboutPageSubheading">
        How is the Score Differential calculated using the World Handicap
        System?
      </h3>
      <p className="aboutPageParagraph">
        An individual golfer's score differential compared to the course par is
        a measure of how their performance on a particular round of golf
        compares to the expected or standard performance on that course. <br />
        ((score - course rating) x 113) / slope rating
      </p>
      <h3 className="aboutPageSubheading">
        How is the Course Handicap calculated using the WHS?
      </h3>
      <p className="aboutPageParagraph">
        The Course Handicap represents the number of strokes a player receives
        on a specific course. It's calculated by multiplying the Handicap Index
        by the Slope Rating of the course (and dividing by 113, which is the
        standard Slope Rating). Then, the resulting number is rounded to the
        nearest whole number.
      </p>
      <p>Formula: Course Handicap = (Handicap Index × Slope Rating / 113)</p>
      <p className="aboutPageParagraph">
        It ensures players of varying abilities can compete fairly on any golf
        course around the world.
      </p>
      <p className="aboutPageParagraph">
        For a comprehensive understanding and more details on the World Handicap
        System, visit the official{" "}
        <a
          href="https://www.whs.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="aboutPageExternalLink"
        >
          WHS website
        </a>
        .
      </p>
    </div>
  );
}

export default AboutPage;
