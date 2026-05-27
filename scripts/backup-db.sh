#!/bin/bash
set -e

BACKUP_DIR="/backup"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/jiajia_${TIMESTAMP}.sql"

echo "💾 Starting database backup..."

# Create backup directory if not exists
mkdir -p ${BACKUP_DIR}

# Run MySQL dump
docker exec $(docker ps -q -f name=jiajia_mysql) \
    mysqldump -u root -p${MYSQL_ROOT_PASSWORD} jiajia > ${BACKUP_FILE}

# Compress backup
gzip ${BACKUP_FILE}

echo "✅ Backup completed: ${BACKUP_FILE}.gz"

# Keep only last 7 days of backups
find ${BACKUP_DIR} -name "jiajia_*.sql.gz" -mtime +7 -delete

echo "🧹 Cleaned up backups older than 7 days"
