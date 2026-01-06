'use client';

export default function Card({
  children,
  title,
  subtitle,
  clickable = false,
  onClick = null,
  className = '',
  imageUrl = null,
  imageHeight = 'h-[180px]',
}) {
  const baseStyles = 'bg-white border border-neutral-200 rounded-lg overflow-hidden transition-all duration-200';
  const interactiveStyles = clickable ? 'cursor-pointer hover:shadow-floating' : 'shadow-elevated';
  const cardClass = `${baseStyles} ${interactiveStyles} ${className}`;

  return (
    <div className={cardClass} onClick={clickable ? onClick : null}>
      {/* Image Section */}
      {imageUrl && (
        <div className={`${imageHeight} bg-neutral-100 overflow-hidden relative`}>
          <img
            src={imageUrl}
            alt={title || 'Card image'}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content Section */}
      <div className="p-lg">
        {title && (
          <h3 className="text-lg font-bold text-neutral-800 mb-sm">{title}</h3>
        )}
        {subtitle && (
          <p className="text-sm text-neutral-500 mb-md">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
}
