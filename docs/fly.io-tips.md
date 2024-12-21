fly ssh console -a webtuitor-backend // Connect to the console of the app on fly.io
fly ssh console -a webtuitor-backend -i 1 // Connect to the console of the first instance of the app on fly.io

ls -l /app // List the files in the app directory on fly.io


fly logs -a webtuitor-backend // Show logs of the app on fly.io

fly scale count 2 -a webtuitor-backend // Scale the app to 2 instances on fly.io

fly status -a webtuitor-backend // Show the status of the app on fly.io

fly restart -a webtuitor-backend // Restart the app on fly.io

fly destroy -a webtuitor-backend // Destroy the app on fly.io

fly deploy -a webtuitor-backend // Deploy the app on fly.io

flyctl volumes list --app webtuitor-backend // List volumes attached to the app on fly.io

flyctl volumes create --region lhr --name webtuitor-backend-volume --app webtuitor-backend // Create a volume on fly.io

flyctl volumes attach --region lhr --name webtuitor-backend-volume --app webtuitor-backend // Attach a volume to the app on fly.io

flyctl volumes detach --region lhr --name webtuitor-backend-volume --app webtuitor-backend // Detach a volume from the app on fly.io

flyctl volumes delete --region lhr --name webtuitor-backend-volume --app webtuitor-backend // Delete a volume on fly.io

flyctl secrets list --app webtuitor-backend // List secrets of the app on fly.io


