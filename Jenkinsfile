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

        stage('Deploy'){
            steps{
                try{
                withCredentials([aws(accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'jenkins_credentials', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh 'aws s3 cp ./build/** s3://crumbs-client-bucket'
              }
                }
                catch (err){
                    sh "echo error"
                }
            }
        }
    }

}