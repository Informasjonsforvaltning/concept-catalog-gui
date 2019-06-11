#!/usr/bin/env bash

i=0

docker_apps="concept-client"

for docker_app in $docker_apps; do
    i=$((i+1))
    BUILD_APPS[$i]=$docker_app
    BUILD_CMD[$i]="( cd $docker_app && ./buildDocker.sh )"
done

maven_apps=""

for maven_app in $maven_apps; do
    i=$((i+1))
    BUILD_APPS[$i]=$maven_app
    BUILD_CMD[$i]="mvn clean install -B -T 2C --projects $maven_app --also-make"
done

export BUILD_APPS
export BUILD_CMD