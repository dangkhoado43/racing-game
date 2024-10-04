import React, { useState, useEffect } from "react";
import "../assets/styles/main.css";
import carA from "../assets/images/carA.jpg";
import carB from "../assets/images/carB.jpg";

function Main() {
    const VICTORY_POINT = 20;
    const [pointA, setPointA] = useState(1);
    const [pointB, setPointB] = useState(1);
    const [message, setMessage] = useState("Same point"); // Keep track of racing game's status
    const [raceEnded, setRaceEnded] = useState(false); // Keep track of whether the race ended or not
    const [autoRace, setAutoRace] = useState(false); // Control automatic racing

    const handleRace = () => {
        const random = Math.random(); // Random from greater or equal to zero and less than one
        if (random < 0.5) {
            setPointA((prevPoint) => {
                return prevPoint + 1;
            });
        } else {
            setPointB((prevPoint) => {
                return prevPoint + 1;
            });
        }
    };

    useEffect(() => {
        if (pointA === VICTORY_POINT) {
            setRaceEnded(true);
            setMessage(`Final Result: A is winner!`);
        } else if (pointB === VICTORY_POINT) {
            setRaceEnded(true);
            setMessage(`Final Result: B is winner!`);
        } else if (pointA > pointB) {
            setMessage("A is winning");
        } else if (pointA < pointB) {
            setMessage("B is winning");
        } else {
            setMessage("Same point");
        }
    }, [pointA, pointB]);

    useEffect(() => {
        let intervalId;
        if (autoRace && !raceEnded) {
            intervalId = setInterval(handleRace, 300);
        }
        return () => clearInterval(intervalId); // Clean up automatic clock when race ends
    }, [autoRace, raceEnded]);

    const handleReset = () => {
        setPointA(1);
        setPointB(1);
        setMessage("Same point");
        setRaceEnded(false);
        setAutoRace(false); // Stop automatic racing when reseting racing
    };

    return (
        <div className="main">
            <h1 className="fw-bold">
                <i className="fa-solid fa-flag-checkered mx-2 text-success"></i>
                Racing Game
            </h1>
            <div
                className={`status fs-4 ${
                    raceEnded ? "text-danger fw-bold" : ""
                }`}
            >
                {message}
            </div>
            <div className="track">
                <img
                    src={carA}
                    alt="Car A"
                    className="carA"
                    // 1. Subtract 1 from 'pointA' to adjust the starting position.
                    // 2. Multiply by (100 / 21) to map points to the length of racing road.
                    // 3. Use 'Math.min' to ensure the value does not exceed 100%.
                    style={{
                        left: `${Math.min((pointA - 1) * (100 / 21), 100)}%`,
                    }}
                />
                <img
                    src={carB}
                    alt="Car B"
                    className="carB"
                    // 1. Subtract 1 from 'pointB' to adjust the starting position.
                    // 2. Multiply by (100 / 21) to map points to the length of racing road.
                    // 3. Use 'Math.min' to ensure the value does not exceed 100%.
                    style={{
                        left: `${Math.min((pointB - 1) * (100 / 21), 100)}%`,
                    }}
                />
            </div>
            {!raceEnded && (
                <>
                    {!autoRace && (
                        <button
                            className="btn btn-primary mx-3"
                            onClick={handleRace}
                        >
                            Race
                        </button>
                    )}
                    <button
                        className={`btn ${
                            !autoRace ? "btn-success" : "btn-danger"
                        }`}
                        onClick={() => setAutoRace((prev) => !prev)}
                    >
                        {!autoRace ? "Start Auto Race" : "Stop Auto Race"}
                    </button>
                </>
            )}
            {(pointA > 1 || pointB > 1) && (
                <button className="btn btn-warning mx-3" onClick={handleReset}>
                    Reset
                </button>
            )}
        </div>
    );
}

export default Main;
