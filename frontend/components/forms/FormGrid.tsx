interface FormGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
}

export function FormGrid({ children, columns = 2 }: FormGridProps) {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <div className={`grid ${gridClass} gap-4`}>
      {children}
    </div>
  );
}