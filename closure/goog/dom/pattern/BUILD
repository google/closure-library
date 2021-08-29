load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

package(default_visibility = ["//visibility:public"])

licenses(["notice"])

closure_js_library(
    name = "abstractpattern",
    srcs = ["abstractpattern.js"],
    lenient = True,
    deps = [
        ":pattern",
        "//closure/goog/dom:tagiterator",
    ],
)

closure_js_library(
    name = "allchildren",
    srcs = ["allchildren.js"],
    lenient = True,
    deps = [
        ":abstractpattern",
        ":pattern",
        "//closure/goog/dom:tagiterator",
    ],
)

closure_js_library(
    name = "childmatches",
    srcs = ["childmatches.js"],
    lenient = True,
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
    lenient = True,
    deps = [
        ":tag",
        "//closure/goog/dom:tagiterator",
    ],
)

closure_js_library(
    name = "fulltag",
    srcs = ["fulltag.js"],
    lenient = True,
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
    lenient = True,
    deps = [
        ":pattern",
        "//closure/goog/dom:tagiterator",
        "//closure/goog/iter",
    ],
)

closure_js_library(
    name = "nodetype",
    srcs = ["nodetype.js"],
    lenient = True,
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
    lenient = True,
)

closure_js_library(
    name = "repeat",
    srcs = ["repeat.js"],
    lenient = True,
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
    lenient = True,
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
    lenient = True,
    deps = [
        ":tag",
        "//closure/goog/dom:tagiterator",
    ],
)

closure_js_library(
    name = "tag",
    srcs = ["tag.js"],
    lenient = True,
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
    lenient = True,
    deps = [
        ":abstractpattern",
        ":pattern",
        "//closure/goog/dom:nodetype",
        "//closure/goog/dom:tagiterator",
    ],
)
