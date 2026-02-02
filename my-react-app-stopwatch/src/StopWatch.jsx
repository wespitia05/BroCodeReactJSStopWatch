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

    return(
        <p>hello</p>
    );
}

export default StopWatch