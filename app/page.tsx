"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getWeatherData } from "../requests/weather";

export default function Home() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);

  const fetchWeatherData = async (locationQuery: string) => {
    setLoading(true);
    setError("");

    try {
      const data = await getWeatherData(locationQuery);
      setWeatherData(data);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const detectLocation = async () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        setIsDetectingLocation(false);
        return;
      }

      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );

        const { latitude, longitude } = position.coords;
        await fetchWeatherData(`${latitude},${longitude}`);
      } catch (err) {
        setError(
          "Unable to detect your location. Please enter a location manually."
        );
      } finally {
        setIsDetectingLocation(false);
      }
    };

    detectLocation();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchWeatherData(location);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Rapid Weather
        </h1>

        {isDetectingLocation && (
          <div className="text-center mb-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Detecting your location...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Get Weather"}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {weatherData && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Weather in {weatherData.location.name},{" "}
              {weatherData.location.country}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Current Local Time:</span>{" "}
                  {weatherData.location.localtime}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Temperature:</span>{" "}
                  {weatherData.current.temp_c}°C
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Weather:</span>{" "}
                  {weatherData.current.condition.text}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Wind speed:</span>{" "}
                  {weatherData.current.wind_kph} Km/h
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Humidity:</span>{" "}
                  {weatherData.current.humidity}%
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Last Updated:</span>{" "}
                  {weatherData.current.last_updated}
                </p>
              </div>
            </div>
            {weatherData.current.condition.icon && (
              <div className="mt-4 flex justify-center">
                <Image
                  src={`https:${weatherData.current.condition.icon}`}
                  alt={weatherData.current.condition.text}
                  width={64}
                  height={64}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
