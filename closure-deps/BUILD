load("//javascript/angular/tools/node/jasmine/builddefs:jasmine_node.bzl", "jasmine_node_test")
load("//javascript/tools/nodejs:nodejs_rules.bzl", "nodejs_binary")
load("//javascript/tools/nodejs:nodejs_rules.bzl", "nodejs_module")

package(default_visibility = [":internal"])

licenses(["notice"])  # Apache License 2.0

exports_files(["LICENSE"])

package_group(
    name = "internal",
    packages = [
        "//closure/goog/...",
        "//third_party/closure/goog_deps/...",
    ],
)

nodejs_module(
    name = "closure-deps",
    srcs = [
        "index.js",
        "//third_party/closure/goog_deps/bin:closuremakedeps.js",
        "//third_party/closure/goog_deps/lib:depfile.js",
        "//third_party/closure/goog_deps/lib:depgraph.js",
        "//third_party/closure/goog_deps/lib:parser.js",
        "//third_party/closure/goog_deps/lib:sourceerror.js",
    ],
    visibility = [
        "//visibility:public",
    ],
    deps = [
        "//third_party/closure/goog_deps/google_closure_compiler:google-closure-compiler",
        "//third_party/javascript/node_modules/yargs",
    ],
)

# Produces Closure Dependency files.
nodejs_binary(
    name = "closure-make-deps",
    entry_point = "closure-deps/bin/closuremakedeps.js",
    visibility = [
        "//visibility:public",
    ],
    deps = [
        ":closure-deps",
    ],
)

# Reads from stdin and determines the language version of the input (e.g. "es6").
nodejs_binary(
    name = "get-js-version",
    srcs = [
        "//third_party/closure/goog_deps/bin:getjsversion.js",
    ],
    entry_point = "closure-deps/bin/getjsversion.js",
    visibility = [
        "//visibility:public",
    ],
    deps = [
        ":closure-deps",
    ],
)

jasmine_node_test(
    name = "jasmine_tests",
    srcs = [
        "//third_party/closure/goog_deps/spec/tests",
    ],
    bootstrap = [
        "google3/third_party/closure/goog_deps/test_bootstrap.js",
    ],
    data = [
        "test_bootstrap.js",
    ],
    visibility = [":internal"],
    deps = [
        ":closure-deps",
        "//closure/goog/bootstrap:google-closure-library",
        "//third_party/javascript/node_modules/jasmine_diff",
    ],
)

filegroup(
    name = "opensource_files",
    srcs = [
        "LICENSE",
        "README.md",
        "index.js",
        "//third_party/closure/goog_deps/bin:opensource_files",
        "//third_party/closure/goog_deps/lib:opensource_files",
        "//third_party/closure/goog_deps/spec/support:opensource_files",
        "//third_party/closure/goog_deps/spec/tests:opensource_files",
    ],
)
