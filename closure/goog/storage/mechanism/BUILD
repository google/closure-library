load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

package(default_visibility = ["//visibility:public"])

licenses(["notice"])

closure_js_library(
    name = "errorcode",
    srcs = ["errorcode.js"],
    lenient = True,
)

closure_js_library(
    name = "errorhandlingmechanism",
    srcs = ["errorhandlingmechanism.js"],
    lenient = True,
    deps = [":mechanism"],
)

closure_js_library(
    name = "html5localstorage",
    srcs = ["html5localstorage.js"],
    lenient = True,
    deps = [":html5webstorage"],
)

closure_js_library(
    name = "html5sessionstorage",
    srcs = ["html5sessionstorage.js"],
    lenient = True,
    deps = [":html5webstorage"],
)

closure_js_library(
    name = "html5webstorage",
    srcs = ["html5webstorage.js"],
    lenient = True,
    deps = [
        ":errorcode",
        ":iterablemechanism",
        "//closure/goog/asserts",
        "//closure/goog/iter",
    ],
)

closure_js_library(
    name = "ieuserdata",
    srcs = ["ieuserdata.js"],
    lenient = True,
    deps = [
        ":errorcode",
        ":iterablemechanism",
        "//closure/goog/asserts",
        "//closure/goog/iter",
        "//closure/goog/structs:map",
        "//closure/goog/useragent",
    ],
)

closure_js_library(
    name = "iterablemechanism",
    srcs = ["iterablemechanism.js"],
    lenient = True,
    deps = [
        ":mechanism",
        "//closure/goog/array",
        "//closure/goog/asserts",
        "//closure/goog/iter",
        "//closure/goog/iter:es6",
    ],
)

closure_js_library(
    name = "iterablemechanismtester",
    testonly = 1,
    srcs = ["iterablemechanismtester.js"],
    lenient = True,
    deps = [
        ":iterablemechanism",
        "//closure/goog/iter",
        "//closure/goog/testing:asserts",
    ],
)

closure_js_library(
    name = "mechanism",
    srcs = ["mechanism.js"],
    lenient = True,
)

closure_js_library(
    name = "mechanismfactory",
    srcs = ["mechanismfactory.js"],
    lenient = True,
    deps = [
        ":html5localstorage",
        ":html5sessionstorage",
        ":ieuserdata",
        ":iterablemechanism",
        ":prefixedmechanism",
    ],
)

closure_js_library(
    name = "mechanismseparationtester",
    testonly = 1,
    srcs = ["mechanismseparationtester.js"],
    lenient = True,
    deps = [
        ":mechanismtestdefinition",
        "//closure/goog/iter",
        "//closure/goog/testing:asserts",
    ],
)

closure_js_library(
    name = "mechanismsharingtester",
    testonly = 1,
    srcs = ["mechanismsharingtester.js"],
    lenient = True,
    deps = [
        ":mechanismtestdefinition",
        "//closure/goog/iter",
        "//closure/goog/testing:asserts",
    ],
)

closure_js_library(
    name = "mechanismtestdefinition",
    testonly = 1,
    srcs = ["mechanismtestdefinition.js"],
    lenient = True,
)

closure_js_library(
    name = "mechanismtester",
    testonly = 1,
    srcs = ["mechanismtester.js"],
    lenient = True,
    deps = [
        ":errorcode",
        "//closure/goog/testing:asserts",
        "//closure/goog/useragent",
        "//closure/goog/useragent:product",
        "//closure/goog/useragent:product_isversion",
    ],
)

closure_js_library(
    name = "prefixedmechanism",
    srcs = ["prefixedmechanism.js"],
    lenient = True,
    deps = [
        ":iterablemechanism",
        "//closure/goog/iter",
    ],
)
