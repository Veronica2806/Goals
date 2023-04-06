export default async function query(requestPath: string, method: string, body?: Record<string, string | boolean | number | any>) {
    //TODO: change any to correct type defenition
    const accessToken = localStorage.getItem('AccessToken');
    try {
        const response = await fetch(`http://localhost:4000/${requestPath}`,
            {
                method: method.toUpperCase(),
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + accessToken
                }
            })

        if (response.status === 401) {
            window.location.replace('/login');
        }

        else if (!response.ok) {
            const data = await response.json();

            throw new Error(data.message);
        }
        else {
            return response;
        }
    }
    catch (error) {
        throw new Error(error);
    }
}