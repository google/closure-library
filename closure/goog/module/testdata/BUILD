load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

package(default_visibility = ["//visibility:public"])

licenses(["notice"])

closure_js_library(
    name = "modA_1",
    testonly = 1,
    srcs = ["modA_1.js"],
    lenient = True,
    deps = ["//closure/goog/testing:asserts"],
)

closure_js_library(
    name = "modA_2",
    testonly = 1,
    srcs = ["modA_2.js"],
    lenient = True,
    deps = [
        "//closure/goog/module:modulemanager",
        "//closure/goog/testing:asserts",
    ],
)

closure_js_library(
    name = "modB_1",
    testonly = 1,
    srcs = ["modB_1.js"],
    lenient = True,
    deps = [
        "//closure/goog/module:modulemanager",
        "//closure/goog/testing:asserts",
    ],
)

closure_js_library(
    name = "errorMod",
    testonly = 1,
    srcs = ["errorMod.js"],
    lenient = True,
    deps = ["//closure/goog/module:modulemanager"],
)
