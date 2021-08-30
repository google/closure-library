load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

package(default_visibility = ["//visibility:public"])

licenses(["notice"])

closure_js_library(
    name = "abstractpattern",
    srcs = ["abstractpattern.js"],
    deps = [
        ":pattern",
        "//closure/goog/dom:tagiterator",
    ],
)

closure_js_library(
    name = "allchildren",
    srcs = ["allchildren.js"],
    deps = [
        ":abstractpattern",
        ":pattern",
        "//closure/goog/dom:tagiterator",
    ],
)

closure_js_library(
    name = "childmatches",
    srcs = ["childmatches.js"],
    deps = [
        ":abstractpattern",
        ":allchildren",
        ":pattern",
        "//closure/goog/dom:tagiterator",
    ],
)

closure_js_library(
    name = "endtag",
    srcs = ["endtag.js"],
    deps = [
        ":tag",
        "//closure/goog/dom:tagiterator",
    ],
)

closure_js_library(
    name = "fulltag",
    srcs = ["fulltag.js"],
    deps = [
        ":pattern",
        ":starttag",
        ":tag",
        "//closure/goog/dom:tagiterator",
    ],
)

closure_js_library(
    name = "matcher",
    srcs = ["matcher.js"],
    deps = [
        ":pattern",
        "//closure/goog/dom:tagiterator",
        "//closure/goog/iter",
    ],
)

closure_js_library(
    name = "nodetype",
    srcs = ["nodetype.js"],
    deps = [
        ":abstractpattern",
        ":pattern",
        "//closure/goog/dom:nodetype",
        "//closure/goog/dom:tagiterator",
    ],
)

closure_js_library(
    name = "pattern",
    srcs = ["pattern.js"],
)

closure_js_library(
    name = "repeat",
    srcs = ["repeat.js"],
    deps = [
        ":abstractpattern",
        ":pattern",
        "//closure/goog/dom:nodetype",
        "//closure/goog/dom:tagiterator",
    ],
)

closure_js_library(
    name = "sequence",
    srcs = ["sequence.js"],
    deps = [
        ":abstractpattern",
        ":pattern",
        "//closure/goog/dom:nodetype",
        "//closure/goog/dom:tagiterator",
    ],
)

closure_js_library(
    name = "starttag",
    srcs = ["starttag.js"],
    deps = [
        ":tag",
        "//closure/goog/dom:tagiterator",
    ],
)

closure_js_library(
    name = "tag",
    srcs = ["tag.js"],
    deps = [
        ":abstractpattern",
        ":pattern",
        "//closure/goog/dom:tagiterator",
        "//closure/goog/object",
    ],
)

closure_js_library(
    name = "text",
    srcs = ["text.js"],
    deps = [
        ":abstractpattern",
        ":pattern",
        "//closure/goog/dom:nodetype",
        "//closure/goog/dom:tagiterator",
    ],
)
