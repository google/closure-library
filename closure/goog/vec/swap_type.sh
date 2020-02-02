#!/bin/sh

# Given an input file that is specific to one type (either float or double)
# output a file specific to the other type.
# Example usages:
#   ./swap_type.sh vec3f.js > vec3d.js
#   ./swap_type.sh mat4d.js > mat4f.js
#   ./swap_type.sh vec2f_test.html > vec2d_test.html
#
# To update all double versions from the float versions:
# for i in `ls *f.js *f_test.js`; do ./swap_type.sh $i > `echo ${i/f/d}`; done

sed -e "s/\([234]\)f/\1F/g" \
    -e "s/\([234]\)d/\1f/g" \
    -e "s/\([234]\)F/\1d/g" \
    -e "s/32bit/XXbit/g" \
    -e "s/64bit/32bit/g" \
    -e "s/XXbit/64bit/g" \
    -e "s/Float32/FloatXX/g" \
    -e "s/Float64/Float32/g" \
    -e "s/FloatXX/Float64/g" \
    -e "s/float/FLOAT/g" \
    -e "s/double/float/g" \
    -e "s/FLOAT/double/g" \
    $1
