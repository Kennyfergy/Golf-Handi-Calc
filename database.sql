
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- Users Table
CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(80) NOT NULL UNIQUE,
    password varchar(1000) NOT NULL,
    logged_in boolean NOT NULL DEFAULT false,
    user_handicap decimal NOT NULL DEFAULT 0.0,
    is_admin boolean NOT NULL DEFAULT false,
    is_male boolean NOT NULL DEFAULT false
);
DROP TABLE users CASCADE;
-- User Courses Table
CREATE TABLE user_courses (
    id serial PRIMARY KEY,
    user_id integer NOT NULL,
    course_name varchar(255) NOT NULL,
    course_location varchar(255) NOT NULL,
    men_course_rating decimal NOT NULL,
    men_course_slope integer NOT NULL,
    men_front_9_par integer NOT NULL,
    men_back_9_par integer NOT NULL,
    women_course_rating decimal NOT NULL,
    women_course_slope integer NOT NULL,
    women_front_9_par integer NOT NULL,
    women_back_9_par integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- User Rounds Table
CREATE TABLE user_rounds (
    id serial PRIMARY KEY,
    user_id integer NOT NULL,
    date timestamp NOT NULL,
    front_9_score integer NOT NULL,
    back_9_score integer NOT NULL,
    course_id integer NOT NULL,
    course_handicap decimal NOT NULL DEFAULT 0.0,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (course_id) REFERENCES user_courses (id)
);