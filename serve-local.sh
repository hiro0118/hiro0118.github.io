#!/bin/bash
# Start the dev server bound to all network interfaces (LAN access)

PORT=${PORT:-3000}

echo ""
echo "  Starting local server on all interfaces (port $PORT)"
echo ""

# Show reachable LAN addresses
for ip in $(hostname -I); do
  # Skip Docker-internal 172.x addresses
  if [[ "$ip" != 172.* ]]; then
    echo "  Local:   http://localhost:$PORT"
    echo "  Network: http://$ip:$PORT"
  fi
done

# Fallback: show all IPs if none matched
ALL_IPS=$(hostname -I)
if [[ -z $(echo "$ALL_IPS" | grep -v '172\.') ]]; then
  echo "  (Running inside Docker — use VS Code Ports panel to expose to LAN)"
  for ip in $ALL_IPS; do
    echo "  Container: http://$ip:$PORT"
  done
fi

echo ""

HOST=0.0.0.0 PORT=$PORT npm start
