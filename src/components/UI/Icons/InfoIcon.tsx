export const InfoIcon: React.FC<{
  color: string;
  height: number;
  width: number;
}> = ({ color, height = 24, width = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="a">
          <path d="m222.14 222.14h755.71v755.71h-755.71z" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <path
          fill={color}
          d="m600 222.14c208.69 0 377.86 169.17 377.86 377.86 0 208.69-169.17 377.86-377.86 377.86-208.68 0-377.86-169.17-377.86-377.86 0-208.68 169.17-377.86 377.86-377.86zm0 75.57c-166.95 0-302.29 135.34-302.29 302.29 0 166.95 135.34 302.29 302.29 302.29 166.95 0 302.29-135.34 302.29-302.29 0-166.95-135.34-302.29-302.29-302.29zm37.789 226.71v264.5h-75.574v-264.5zm0-113.36v75.57h-75.574v-75.57z"
        />
      </g>
    </svg>
  );
};
