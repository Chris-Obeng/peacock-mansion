/** An abstract peacock fan, drawn from the house's own embroidered emblem. Decorative. */
export function Ornament({ className = "", title }: { className?: string; title?: string }) {
  const cx = 16;
  const cy = 28;
  const r = 21;
  const angles = [-72, -48, -24, 0, 24, 48, 72];
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {angles.map((a) => {
        const rad = (a * Math.PI) / 180;
        const x = cx + Math.sin(rad) * r;
        const y = cy - Math.cos(rad) * r;
        const ex = cx + Math.sin(rad) * (r - 3.2);
        const ey = cy - Math.cos(rad) * (r - 3.2);
        return (
          <g key={a}>
            <line x1={cx} y1={cy} x2={ex} y2={ey} />
            <ellipse cx={x} cy={y} rx="1.5" ry="2.4" transform={`rotate(${a} ${x} ${y})`} />
          </g>
        );
      })}
      <path d="M11 30.5 Q16 27 21 30.5" />
    </svg>
  );
}
