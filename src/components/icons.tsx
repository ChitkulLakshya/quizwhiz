import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      {...props}
    >
      <rect width="256" height="256" fill="none" />
      <path
        d="M115.6,80a52,52,0,1,1-52,52,51.9,51.9,0,0,1,52-52Zm62.9,94.3,20.8,20.8a8,8,0,0,1-11.3,11.3l-20.8-20.8a88,88,0,1,1,11.3-11.3Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <path d="M112.5,123.5l-17,17" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
      <path d="M127,109l-17,17" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
    </svg>
  ),
};
