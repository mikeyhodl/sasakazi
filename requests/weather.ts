"use server";
export async function getWeatherData(location: string) {
    const headers = {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    };

    try {
        const response = await fetch(
            `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`,
            {
                headers,
                next: { revalidate: 300 } // Cache for 5 minutes
            }
        );

        if (!response.ok) {
            throw new Error('Weather data fetch failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}
