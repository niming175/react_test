# /bin/sh

if [ $# -gt 0 ] ; then
docker build -t docker-demo:$1 -t docker-demo:latest .
else
docker build -t docker-demo:latest .
fi

