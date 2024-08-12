export function onRequest({ request, next }) {
    // Przechwytywanie odpowiedzi
    return next().then(response => {
        if (response.status === 404) {
            return new Response(null, { status: 302, headers: { "Location": "/404.html" } });
        }
        return response;
    });
}
