export const scheduleWebhookCallback = (jobId:string, prompt:string) => {
    setTimeout(async () => {
        const secret = process.env.SHARED_SECRET ?? '';
        try {
            const data = await fetch(`http://backend:${Number(process.env.PORT)}/webhook/callback`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'X-SHARED-SECRET': secret,
                }, 
                body: JSON.stringify({
                    jobId,
                    result: `AI PROCESSED RESULT from ${prompt}`
                })
            });

            console.log('AI processed job successfully called webhook', data);
        } catch (error) {
            
        }
    }, 5000)
}