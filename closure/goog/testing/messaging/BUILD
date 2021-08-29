load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

package(default_visibility = ["//visibility:public"])

licenses(["notice"])

closure_js_library(
    name = "mockmessagechannel",
    srcs = ["mockmessagechannel.js"],
    lenient = True,
    deps = [
        "//closure/goog/messaging:abstractchannel",
        "//closure/goog/testing:asserts",
        "//closure/goog/testing:mockcontrol",
    ],
)

closure_js_library(
    name = "mockmessageevent",
    srcs = ["mockmessageevent.js"],
    lenient = True,
    deps = [
        "//closure/goog/events:browserevent",
        "//closure/goog/events:eventtype",
        "//closure/goog/testing/events",
    ],
)

closure_js_library(
    name = "mockmessageport",
    srcs = ["mockmessageport.js"],
    lenient = True,
    deps = [
        "//closure/goog/events:eventtarget",
        "//closure/goog/testing:mockcontrol",
    ],
)

closure_js_library(
    name = "mockportnetwork",
    srcs = ["mockportnetwork.js"],
    lenient = True,
    deps = [
        ":mockmessagechannel",
        "//closure/goog/messaging:portnetwork",
        "//closure/goog/testing:mockcontrol",
    ],
)
