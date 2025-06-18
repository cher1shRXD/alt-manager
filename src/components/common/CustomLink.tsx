"use client";

import { loadingStore } from "@/stores/loadingStore";
import { CustomLinkProps } from "@/types/props/CustomLinkProps";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const CustomLink = ({ href, children, className }: CustomLinkProps) => {
  const pathname = usePathname();
	const searchParams = useSearchParams();
  const { setIsLoading } = loadingStore();

	return (
		<Link
			href={href}
			onClick={(e) => {
				if (`${pathname}/?${searchParams.toString()}` !== href) setIsLoading(true); else e.preventDefault();
			}}
			className={className}
		>
			{children}
		</Link>
	);
};

export default CustomLink;
