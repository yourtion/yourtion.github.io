#!/bin/bash
jekyll build
cd _site && git publish
