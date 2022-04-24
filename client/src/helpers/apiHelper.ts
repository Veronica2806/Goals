export default function apiHelper(requestPath: string, method: string, body) {
    fetch(`http://localhost:4000/${requestPath}`,
        {
            method: method.toUpperCase(),
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
}