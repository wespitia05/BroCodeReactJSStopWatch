import React, {useState, useEffect, useRef} from "react";

function StopWatch() {
    // will determine if stopwatch is running or not; initial state is not running
    const [isRunning, setIsRunning] = useState(false);
    // keeps track of how much time has elapsed; initial state will be 0ms
    const [elapsedTime, setElapsedTime] = useState(0);
    // if we start an interval, we need to clear it if we're not using it
    const intervalIdRef = useRef(null);
    // we need to get current time when we start our stopwatch
    const startTimeRef = useRef(0);

    // when we mount our component and if isRunning ever changes, we perform whatever code is in useEffect
    // this is where we start our interval (move time forward)
    useEffect(() => {
        // check if isRunning is true
        if(isRunning) {
            // create inteval to move time forward
            intervalIdRef.current = setInterval(() => {
                // set the elapsed time to be the time right now minus the time we started
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10); // repeats every 10ms
        }
        // clean up function to avoid unexpected behavior
        return() => {
            // clears the interval so the program stops working
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);

    // this function will handle starting the time
    function start() {
        // set the state of isRunning to be true (timer starts)
        setIsRunning(true);
        // now - start time = how long we've been running
        startTimeRef.current = Date.now() - elapsedTime;
    }

    // this function will handle stopping the time
    function stop() {
        // set the state of isRunning to be false (timer stops)
        setIsRunning(false);
    }

    // this function will handle resetting the time
    function reset() {
        setElapsedTime(0); // resets time back to zero (initial state)
        setIsRunning(false); // timer stops
    }

    // this function will handle formatting the time
    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${minutes}:${seconds}:${milliseconds}`;
    }

    return(
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button className="start-button" onClick={start}>Start</button>
                <button className="stop-button" onClick={stop}>Stop</button>
                <button className="reset-button" onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default StopWatch