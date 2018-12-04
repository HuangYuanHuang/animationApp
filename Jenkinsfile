pipeline {
  agent {
    docker {
      args '-p 3000:3000'
      image 'node:8-alpine'
    }

  }
  stages {
    stage('ready') {
      steps {
        echo 'first start'
      }
    }
    stage('test') {
      steps {
        sh 'node --version'
      }
    }
  }
}