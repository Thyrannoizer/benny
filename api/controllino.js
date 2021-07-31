async function fetchControllinoData() {
    return fetch(
        "http://localhost:8081/api/get-ring-times",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    ).then((response) => response.json());
}

const extractData = fetchResponse => fetchResponse;

export const fetchRingTimesData = async () => {
    const data = await fetchControllinoData();
    return extractData(data);
}
