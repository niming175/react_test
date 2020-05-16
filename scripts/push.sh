#!/bin/sh

pwd=${ALIYUN_REGISTRY_PASSWORD}
docker login --username=tb803272_00 -p $pwd registry.cn-hangzhou.aliyuncs.com

docker tag docker-demo:latest registry.cn-hangzhou.aliyuncs.com/niming175/docker-damo:latest
docker push registry.cn-hangzhou.aliyuncs.com/niming175/docker-demo:latest

if [ $# -gt 0 ] ; then
  tag=$1
  docker tag demo-app:latest registry.cn-hangzhou.aliyuncs.com/niming175/docker-demo:${tag}
  docker push registry.cn-hangzhou.aliyuncs.com/niming175/docker-demo:${tag}
fi

