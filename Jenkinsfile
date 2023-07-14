pipeline {
    agent any
    environment {
        APPLICATION = 'MY NOTES FRONTEND'
        DOCKER_HUB_USERNAME = credentials('docker').username
        DOCKER_HUB_PASSWORD = credentials('docker').password
    }
    stages {
        stage("build") {
            steps {
                echo "**************** start building the ${APPLICATION} on branch - ${BRANCH_NAME} ****************"
                echo "**************** docker credentials ${DOCKER_HUB_USERNAME} / - ${DOCKER_HUB_PASSWORD} ****************"
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage("test") {
            steps {
                echo "**************** testing the app ****************"
            }
        }

        stage("deploy") {
            steps {
                echo "**************** deploying the ${APPLICATION} ****************"
                sh 'docker build -t petardimitrovstoyanov/my-notes-fe .'
//                 withCredentials([
//                   usernamePassword(credentials: 'docker', usernameVariable: 'USER', passwordVariable: 'PWD')
//                 ]) {
//                   sh 'docker login -u DOCKER_HUB_USERNAME -p DOCKER_HUB_PASSWORD'
//                 }
                sh 'docker login -u DOCKER_HUB_USERNAME -p DOCKER_HUB_PASSWORD'
                sh 'docker push petardimitrovstoyanov/my-notes-fe:latest'
                sh 'docker stop $(docker ps -q --filter "name=petardimitrovstoyanov/my-notes-fe") || true'
                sh 'docker rm $(docker ps -aq --filter "name=petardimitrovstoyanov/my-notes-fe") || true'
                sh 'docker rmi petardimitrovstoyanov/my-notes-fe:latest || true'
                sh 'docker run -p 8001:8001 petardimitrovstoyanov/my-notes-fe'
            }
        }
    }
}
