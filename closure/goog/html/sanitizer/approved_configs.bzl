"""Allows the sanitizer's maintainers to control visibility of the goog.html.sanitizer.unsafe package without Closure ownership."""

def create_approved_for_config_package_groups():
    """Package group of targets that have been reviewed and approved to use a potentially unsafe HTML sanitizer configuration.

    Note that visibility restrictions currently have limited effectiveness for
    JavaScript. Nevertheless, declaring restricted visibility sends a signal
    that use of a potentially unsafe sanitizer configuration requires approval.
    """
    native.package_group(
        name = "approved_for_unsafe_config",
        packages = [
            # IMPORTANT: Please have one of the OWNERS of this file, as a reviewer
            # on any CLs that modifies this list.
            # Please keep this list in alphabetical order.

            # For contenteditable="false", used by Pinto's paybymail.
            "//java/com/google/caribou/ui/pinto/modules/slickcompose",

            # For compilation tests
            "//javascript/closure",
            "//javascript/closure/html/sanitizer",  # for the alias rule
            "//third_party/javascript/closure",

            # TODO(user): Dependency added via visibility leak.  Needs security review.
            "//java/com/google/corp/sales/workflow/quality/dbmcm/ui/task",
            "//java/com/google/corp/sales/workflow/quality/ui/task",

            # For allow jsaction on reviews received by AJAX
            "//java/com/google/gws/plugins/ads/products/listing/entityui/jackpot/common",
            "//java/com/google/gws/plugins/shopping/productknowledge/common",
        ],
    )
