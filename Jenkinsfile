pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }
    
    stages{

        stage('Build'){
            steps{
                sh 'npm install --force'
                sh 'npm run build'
            }
        }
        
        stage('SonarQube Analysis') {
            def scannerHome = tool 'sonarqube';
            withSonarQubeEnv() {
                sh "${scannerHome}/bin/sonar-scanner"
            }
        }

        stage('Deploy'){
            steps{
                withCredentials([aws(accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'jenkins_credentials', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh 'aws s3 cp ./build/ s3://crumbs-client --recursive --acl public-read'
              }
            }
        }
    }

}
