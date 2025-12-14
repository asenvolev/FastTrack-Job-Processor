Monolith architecture but can easily be split into microservices.
Horizontal scale can be achieved with more instances in docker compose.
The stack is the same as the requirements.
Used websockets to update new jobs and statuses on the front end.
Did not use any state manager but Redux would fit .
Used mongoose for typed DB interactions.
MockWorker which updates the job status through proxy backend:port/webhook/callback with setTimeout.
