export default function GridOverlay(props) {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h38v38H1z' stroke='%23ffffff' stroke-opacity='0.06' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px'
      }}
      {...props}
    />
  );
}
