export default function PlaceholderImage({ width, height }: { width: number; height: number }) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6b7280',
        fontSize: '14px',
      }}
    >
      {width}x{height}
    </div>
  );
} 