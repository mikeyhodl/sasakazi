import Head from "next/head";
import styles from "../styles/Home.module.css";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script src="api.js" />
      <Head>
        <title>Weather App Sasakazi</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Weather App RapidAPI</h1>
        <br />
        <div>
          <form style={{ textAlign: "center" }}>
            <label htmlFor="location">
              <strong>Please enter your location:</strong>
            </label>
            <br />
            <input
              autoComplete="off"
              type="text"
              name="location"
              id="location"
              className="form-control"
            />
            <br />
            <button type="submit" value="Submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
        <div id="weather" />
      </main>
    </>
  );
}
