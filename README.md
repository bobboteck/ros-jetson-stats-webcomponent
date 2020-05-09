# ros-jetson-stats-webcomponent

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a83b3c91b548453f953a8e06896b3a4b)](https://app.codacy.com/manual/bobboteck/ros-jetson-stats-webcomponent?utm_source=github.com&utm_medium=referral&utm_content=bobboteck/ros-jetson-stats-webcomponent&utm_campaign=Badge_Grade_Settings) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/bobboteck/ros-jetson-stats-webcomponent) ![GitHub file size in bytes](https://img.shields.io/github/size/bobboteck/ros-jetson-stats-webcomponent/src/index.js) ![GitHub All Releases](https://img.shields.io/github/downloads/bobboteck/ros-jetson-stats-webcomponent/total)

## About

**Author: [Roberto D'Amico](http://bobboteck.github.io)**

A **ROS Jetson Stats WebComponent**, is a Web Component that show Nvidia Jetson board information (currently is developed and tested only on the Jetson Nano), the information is retrieved through the **ROS** wrapper of the **jetson-stats** tool.
The project was designed to be integrated into a Web Console, designed to monitor and control a ROS-based robot and an Nvidia Jetson (Nano) board.

## What you need to use it

To use this Web Component you need to install on the Jetson Nano:

* ROS and rosbridge-suite
* the [Jetson stats](https://github.com/rbonghi/jetson_stats)
* and clone in the your workspace the wrapper [ros_jetson_stats](https://github.com/rbonghi/ros_jetson_stats)

A complete example of use of this **Web Components** is available here: [Nvidia JetBot ROS Web Console](https://github.com/bobboteck/jetbot_ros_webconsole)
