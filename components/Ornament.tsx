/**
 * The house mark: a peacock's raised train drawn as a Rococo fan, after the
 * gold emblem the house embroiders on its linen. Decorative.
 */
export function Ornament({ className = "", title }: { className?: string; title?: string }) {
  const cx = 16;
  const cy = 27;
  const feathers = [-66, -44, -22, 0, 22, 44, 66];
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {feathers.map((a) => {
        const rad = (a * Math.PI) / 180;
        const len = 19 - Math.abs(a) / 22;
        const ex = cx + Math.sin(rad) * len;
        const ey = cy - Math.cos(rad) * len;
        const mx = cx + Math.sin(rad) * (len - 4.4);
        const my = cy - Math.cos(rad) * (len - 4.4);
        return (
          <g key={a} transform={`rotate(${a} ${(ex + mx) / 2} ${(ey + my) / 2})`}>
            <line x1={cx + Math.sin(rad) * 3} y1={cy - Math.cos(rad) * 3} x2={mx} y2={my} transform={`rotate(${-a} ${(ex + mx) / 2} ${(ey + my) / 2})`} />
            <ellipse cx={(ex + mx) / 2} cy={(ey + my) / 2} rx="1.7" ry="2.6" />
            <circle cx={(ex + mx) / 2} cy={(ey + my) / 2 + 0.3} r="0.55" fill="currentColor" stroke="none" />
          </g>
        );
      })}
      <path d="M10.5 29.5c2-2.2 3.8-3 5.5-3s3.5.8 5.5 3" />
    </svg>
  );
}
