import { ReactNode } from "react";
import Link from "next/link";
import cx from "classnames";
import { InferProps } from "prop-types";

type KeyButtonProps = InferProps<HTMLAnchorElement> & {
  href: string;
  className?: string;
  children: ReactNode | ReactNode[];
  small?: boolean;
};

export default function KeyButton({
  children,
  className,
  small,
  ...anchorProps
}: KeyButtonProps) {
  return (
    <Link
      draggable={false}
      className={cx(
        "relative inline-flex rounded-2xl bg-emerald-700 text-center text-black mt-1",
        className
      )}
      {...anchorProps}
    >
      <div
        className={cx(
          "hover:scale-9 transform rounded-2xl bg-green-200 transition-all duration-100 active:bg-green-100",
          {
            "text-lg px-3 pt-2 pb-1 -translate-y-1 -translate-x-1 hover:-translate-y-0.5 hover:-translate-x-0.5 active:-translate-y-0 active:-translate-x-0":
              small,
            "text-3xl md:text-4xl px-8 md:px-16 pt-6 pb-5 md:pt-8 md:pb-7 -translate-y-2 -translate-x-2 hover:-translate-y-1 hover:-translate-x-1 active:-translate-y-0 active:-translate-x-0":
              !small,
          }
        )}
      >
        {children}
      </div>
    </Link>
  );
}
