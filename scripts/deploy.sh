#!/bin/bash
set -e

echo "🚀 JiaJia Production Deployment Script"
echo "========================================"

# Load environment variables
if [ -f .env.prod ]; then
    export $(cat .env.prod | xargs)
fi

# Build image
echo "📦 Building Docker image..."
docker build -t jiajia-api:latest .

# Initialize swarm if not already
echo "🐳 Checking Docker Swarm..."
if ! docker info --format '{{.Swarm.LocalNodeState}}' | grep -q "active"; then
    echo "Initializing Docker Swarm..."
    docker swarm init
fi

# Deploy stack
echo "🚀 Deploying stack..."
docker stack deploy -c docker-compose.prod.yml jiajia

# Verify deployment
echo "✅ Verifying deployment..."
sleep 10
docker service ls | grep jiajia

echo ""
echo "🎉 Deployment complete!"
echo "API: http://localhost/api/v1"
echo "Swagger: http://localhost/api/docs"
echo "Grafana: http://localhost:3001"
echo "Prometheus: http://localhost:9090"
