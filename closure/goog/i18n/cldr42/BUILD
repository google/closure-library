load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")

package(default_visibility = ["//visibility:public"])

closure_js_library(
    name = "datetimesymbols",
    srcs = ["datetimesymbols.js"],
    lenient = True,
)

closure_js_library(
    name = "datetimesymbolsext",
    srcs = ["datetimesymbolsext.js"],
    lenient = True,
    deps = [":datetimesymbols"],
)

closure_js_library(
    name = "datetimepatternsext",
    srcs = ["datetimepatternsext.js"],
    lenient = True,
    deps = [
        ":datetimepatterns",
        "//closure/goog/i18n:datetimepatternstype",
    ],
)

closure_js_library(
    name = "datetimepatterns",
    srcs = ["datetimepatterns.js"],
    lenient = True,
    deps = ["//closure/goog/i18n:datetimepatternstype"],
)
