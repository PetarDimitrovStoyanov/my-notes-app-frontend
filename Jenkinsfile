pipeline {
    agent any
    environment {
        APPLICATION = 'MY NOTES FRONTEND'
        DOCKER_HUB_USERNAME = credentials('docker-hub')
    }
    stages {
        stage("build") {
            steps {
                echo "start building the ${APPLICATION} on branch - ${BRANCH_NAME}"
                withCredentials([
                    usernamePassword(credentials: 'docker-hub', usernameVariable: 'USER')
                ]) {
                    echo "credentials - ${USER}"
                }
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage("test") {
            steps {
                echo 'testing the app'
            }
        }

        stage("deploy") {
            steps {
                echo "deploying the ${APPLICATION}"
                sh 'docker build -t petardimitrovstoyanov/my-notes-fe .'
                withCredentials([
                  usernamePassword(credentials: 'docker-hub', usernameVariable: 'USER', passwordVariable: 'PWD')
                ]) {
                  echo "credentials - ${USER}"
                  sh 'docker login -u USER -p PWD'
                }
                sh 'docker push petardimitrovstoyanov/my-notes-fe:latest'
                sh 'docker run -p 8001:8001 petardimitrovstoyanov/my-notes-fe'
            }
        }
    }
}
