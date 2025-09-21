1. cd docker-sample
2. docker build -t sample-node-docker .
3. docker run -p 6000:3000 sample-node-docker
4. hit http://localhost:6000 from postman and check the output.
5. also hit  http://localhost:3000 and check the output
6. docker exec -it 8a037ea49fba /bin/sh

Note: If you want to start a docker container, no need to do `npm install` explicitly. Because, it is being done in Dockerfile.
