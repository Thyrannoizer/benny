async function fetchControllinoData() {
    return fetch(
        "/get-ring-times",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    ).then((response) => response.json());
}

const extractData = fetchResponse => fetchResponse.data;

export const fetchRingTimesData = async () => {
    const data = await fetchControllinoData();
    return extractData(data);
}
