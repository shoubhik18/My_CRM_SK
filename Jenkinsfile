pipeline {
    agent {
    node {
         label 'skillcapital'
         }
     }  

    environment {
        deployBranch = "${env.BRANCH_NAME}"
        deployService = "your_deploying_dev_service"
        SONARQUBE_URL = 'https://sonarqube.kdigital.ai'  // Your SonarQube URL
        SONARQUBE_TOKEN = credentials('sonarqube')  // Replace with your Jenkins credential ID
    }  
    stages {
        stage('notification-slack') {
            steps {
                slackSend channel: 'deployments', 
                          color: '439FE0', 
                          message: "started ${JOB_NAME} ${BUILD_NUMBER} (<${BUILD_URL}|Open>)", 
                          teamDomain: 'konadigital', 
                          tokenCredentialId: 'slack', 
                          username: 'sk-crm'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool name: 'sonarqube', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv('sonarqube') {  // Name of SonarQube instance in Jenkins configuration
                        sh """
                        ${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=sk-crm-web \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=${SONARQUBE_URL} \
                        -Dsonar.login=${SONARQUBE_TOKEN} \
                        -Dsonar.ws.timeout=300
                        """
                    }
                }
            }
        }
        stage('Deploynibg to Vercel') {
            steps {
                script {

                    sh 'curl https://api.vercel.com/v1/integrations/deploy/prj_dnOJzexjLeTOHu5IVE9dZkZYRbQ7/E3rUL1w9n5'

                }
            }
        }
        stage('Build Logs') {
            steps {
                emailext body: 'Build logs for this Job',
                        subject: 'jenkins-notification',
                        to: 'devops@digital-edify.com',
                        attachLog: true
            }
        }
    }
}
