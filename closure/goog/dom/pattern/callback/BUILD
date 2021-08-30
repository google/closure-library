load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

package(default_visibility = ["//visibility:public"])

licenses(["notice"])

closure_js_library(
    name = "callback",
    srcs = ["callback.js"],
    deps = [
        "//closure/goog/dom",
        "//closure/goog/dom:tagiterator",
        "//closure/goog/iter",
    ],
)

closure_js_library(
    name = "counter",
    srcs = ["counter.js"],
)

closure_js_library(
    name = "test",
    srcs = ["test.js"],
    deps = ["//closure/goog/iter"],
)
