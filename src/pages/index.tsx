import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import TopBar from "./components/TopBar";
import { ThemeProvider } from "@emotion/react";
import { Button, Card, CardMedia, Container, Grid, Link, Typography, createTheme, makeStyles } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const defaultTheme = createTheme();
  return (
    <>
      <TopBar />
      <ThemeProvider theme={defaultTheme}>
        <Container maxWidth="sm" >
          <Grid mt={25}>
            <Typography variant="h2" align="center" >
              Magzines
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
              Your go-to destination for all things amazing!
            </Typography>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}
