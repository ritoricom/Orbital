import PropTypes from "prop-types";
import NextLink from "next/link";
import { Link } from "@/ui/navigation";
import { useMediaQuery } from "@/lib/media";
import { L_BREAKPOINT_DOWN } from "@/config/breakpoints";

export const BreadcrumbsLink = ({ href, children, disabled }) => {
  const iSDesktop = useMediaQuery(L_BREAKPOINT_DOWN);
  return (
    <NextLink passHref href={href}>
      <Link
        disabled={disabled}
        uppercase
        size={iSDesktop ? "s" : "m"}
        lineClamp={1}
      >
        {children}
      </Link>
    </NextLink>
  );
};

BreadcrumbsLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};
