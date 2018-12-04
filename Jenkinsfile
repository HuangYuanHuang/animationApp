pipeline {
  agent {
    docker {
      image 'node:6-alpine'
      args '-p 3000:3000'
    }

  }
  stages {
    stage('ready') {
      steps {
        echo 'first start'
      }
    }
    stage('build') {
      steps {
        sh 'ng build --prod'
      }
    }
  }
}