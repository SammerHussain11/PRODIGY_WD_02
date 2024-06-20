import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f4f8",
        color: "black",
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          padding: 4,
          boxShadow: 6,
          borderRadius: 2,
          background: "linear-gradient(135deg, #eceff1 30%, #ffffff 90%)",
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Stopwatch
          </Typography>
          <Typography
            variant="h2"
            gutterBottom
            align="center"
            color="secondary"
          >
            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
            {("0" + ((time / 10) % 100)).slice(-2)}
          </Typography>
          <Box display="flex" justifyContent="center" mb={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStart}
              disabled={isRunning}
              sx={{ mr: 1 }}
            >
              Start
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStop}
              disabled={!isRunning}
              sx={{ mr: 1 }}
            >
              Stop
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLap}
              disabled={!isRunning}
              sx={{ mr: 1 }}
            >
              Lap
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleReset}
              disabled={!isRunning && time === 0}
            >
              Reset
            </Button>
          </Box>
          <List dense>
            {laps.map((lap, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Lap ${index + 1}`}
                  secondary={`${("0" + Math.floor((lap / 60000) % 60)).slice(
                    -2
                  )}:${("0" + Math.floor((lap / 1000) % 60)).slice(-2)}:${(
                    "0" +
                    ((lap / 10) % 100)
                  ).slice(-2)}`}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Stopwatch;
