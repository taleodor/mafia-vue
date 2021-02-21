pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: jenkins-slave
spec:
  containers:
  - name: dind
    image: docker:19.03.12-dind
    command:
    - cat
    volumeMounts:
    - mountPath: /var/run/docker.sock
      name: dockersock
    tty: true
  volumes:
  - name: dockersock
    hostPath:
      path: /var/run/docker.sock
"""
        }
    }
    environment { RELIZA_API = credentials('RELIZA_API') }
    stages {
        stage ('Build and Deploy') {
            steps {
                withReliza (uri: 'https://test.relizahub.com') {
                    script {
                        try {
                            env.COMMIT_TIME = sh(script: 'git log -1 --date=iso-strict --pretty="%ad"', returnStdout: true).trim()
                            container('dind') {
                                sh '''
                                    docker build -t relizatest/throw .
                                    docker login -u relizatest -p password
                                    docker push relizatest/throw
                                    DOCKER_SHA_256=$(docker images --no-trunc --quiet relizatest/throw:latest)
                                '''
                                env.DOCKER_SHA_256 = sh(script: 'docker images --no-trunc --quiet relizatest/throw:latest', returnStdout: true)
                            }
                        } catch (Exception e) {
                            env.STATUS = 'rejected'
                            echo 'FAILED BUILD: ' + e.toString()
                        }
                        addRelizaRelease(artId: "relizatest/throw")
                    }
                }
            }
        }
    }
}